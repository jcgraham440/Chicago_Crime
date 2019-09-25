import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:yourpassword@localhost:5432/crime_db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# prepare to load the entire chicago table into a dataframe
Chicago_Metadata = Base.classes.chicago
stmt = db.session.query(Chicago_Metadata).statement
df = pd.read_sql_query(stmt, db.session.bind)
print("Loaded dataframe successfully...")
# prepare leaflet json
dflocs = df[["Primary_Type", "Latitude", "Longitude"]].copy()
g = dflocs.to_json()

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/pie")
def pie():
    """Return a list of Primary_Types and their respective numbers"""
    ptype = df[["Primary_Type"]].copy()
    ptype_group_cnt = ptype.groupby("Primary_Type").size()
    return (ptype_group_cnt.to_json())

@app.route("/heatmap")
def heatmap():
    return render_template("leafletheatmap.html")
    
@app.route("/leaflet")
def leaflet():
    return (g)

# route for arrestcrimetype
@app.route("/crimetype")
def crimetype():
    print("rendering arrest_crimetype.html...")
    return render_template("arrest_crimetype.html")

@app.route("/crimerates")
def crimerates():
    print("calculating crime arrest rates...")
    dflocs = df[["Primary_Type", "Arrest"]].copy()
    s = dflocs.groupby(["Primary_Type", "Arrest"]).size().reset_index()
    curFalseRate = 0
    newd = {}
    # build a dictionary of Crime Types and Crime Rates
    for row in s.iterrows():
        curType = row[1].Primary_Type
        if (curFalseRate != 0):
            arrestRate = round((row[1][0]) / (curFalseRate + row[1][0]), 4)
            newd[str(curType)] = arrestRate
            curFalseRate = 0
        else:
            curFalseRate = row[1][0]

    return(jsonify(newd))


if __name__ == "__main__":
    app.run()
