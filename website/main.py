from flask import Flask,redirect, url_for,render_template,request,json
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

# from  crop import classifier


app=Flask(__name__)
app.secret_key="Teams"
@app.route("/")
def home():
    return render_template("index.html",cont="User")

@app.route("/login",methods=['GET','POST'])
def login():
    if request.method=='POST':
        N=float(request.form['Nitrogen'])
        P=float(request.form['Phosphorous'])
        K=float(request.form['Potassium'])
        Temperature=float(request.form['Temperature'])
        Humidity=float(request.form['Humidity'])
        PH=float(request.form['PH'])
        Rainfall=float(request.form['Rainfall'])
        # object = Crop.classifier.predict(np.array([N,P,K,Humidity,PH,Rainfall]))
        # model=pickle.load(open("model.pkl",'rb'))
        data= pd.read_csv('data/Crop_recommendation.csv')
        data['label']=LabelEncoder().fit_transform(data['label'])
        data['label'].unique()
        X = data.drop(['label'],axis=1)
        Y = data.label
        X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.20)
        scaler = StandardScaler()
        scaler.fit(X_train)

        X_train = scaler.transform(X_train)
        X_test = scaler.transform(X_test)
        classifier = KNeighborsClassifier(n_neighbors=5)
        classifier.fit(X_train, y_train)
        predict1=classifier.predict(np.array([N, P, K, Temperature, Humidity, PH, Rainfall]).reshape(1,-1) )
        if predict1==0:
            crop_name = 'Apple(सेब)'
        elif predict1 == 1:
            crop_name = 'Banana(केला)'
        elif predict1 == 2:
            crop_name = 'Blackgram(काला चना)'
        elif predict1 == 3:
            crop_name = 'Chickpea(काबुली चना)'
        elif predict1 == 4:
            crop_name = 'Coconut(नारियल)'
        elif predict1 == 5:
            crop_name = 'Coffee(कॉफ़ी)'
        elif predict1 == 6:
            crop_name = 'Cotton(कपास)'
        elif predict1 == 7:
            crop_name = 'Grapes(अंगूर)'
        elif predict1 == 8:
            crop_name = 'Jute(जूट)'
        elif predict1 == 9:
            crop_name = 'Kidneybeans(राज़में)'
        elif predict1 == 10:
            crop_name = 'Lentil(मसूर की दाल)'
        elif predict1 == 11:
            crop_name = 'Maize(मक्का)'
        elif predict1 == 12:
            crop_name = 'Mango(आम)'
        elif predict1 == 13:
            crop_name = 'Mothbeans(मोठबीन)'
        elif predict1 == 14:
            crop_name = 'Mungbeans(मूंग)'
        elif predict1 == 15:
            crop_name = 'Muskmelon(खरबूजा)'
        elif predict1 == 16:
            crop_name = 'Orange(संतरा)'
        elif predict1 == 17:
            crop_name = 'Papaya(पपीता)'
        elif predict1 == 18:
            crop_name = 'Pigeonpeas(कबूतर के मटर)'
        elif predict1 == 19:
            crop_name = 'Pomegranate(अनार)'
        elif predict1 == 20:
            crop_name = 'Rice(चावल)'
        elif predict1 == 21:
            crop_name = 'Watermelon(तरबूज)'

        if float(Humidity) >=1 and float(Humidity)<= 33 : 
            humidity_level = 'Low Humid'
        elif float(Humidity) >=34 and float(Humidity) <= 66:
            humidity_level = 'Medium Humid'
        else:
            humidity_level = 'High Humid'

        if float(Temperature) >= 0 and float(Temperature)<= 6:
            temperature_level = 'Cool'
        elif float(Temperature) >=7 and float(Temperature):
            temperature_level = 'Warm'
        else:
            temperature_level= 'Hot' 

        if float(Rainfall) >=1 and float(Rainfall) <= 100:
            rainfall_level = 'Less'
        elif float(Rainfall) >= 101 and float(Rainfall) <=200:
            rainfall_level = 'Moderate'
        elif float(Rainfall) >=201:
            rainfall_level = 'Heavy Rain'

        if float(N) >= 1 and float(N) <= 50: 
            N_level = 'Less'
        elif float(N) >=51 and float(N) <=100:
            N_level = 'Not too less and Not to High'
        elif float(N) >=101:
            N_level = 'High'

        if float(P) >= 1 and float(P) <= 50:
            P_level = 'Less'
        elif float(P) >= 51 and float(P) <=100:
            P_level = 'Not too less and Not to High'
        elif float(P) >=101:
            P_level = 'High'

        if float(K) >= 1 and float(K) <=50: 
            potassium_level = 'Less'
        elif float(K) >= 51 and float(K) <= 100:
            potassium_level = 'Not too less and Not to High'
        elif float(K) >=101:
            potassium_level = 'High'

        if float(PH) >=0 and float(PH) <=5:             
            phlevel = 'Acidic' 
        elif float(PH) >= 6 and float(PH) <= 8:
            phlevel = 'Neutral'
        elif float(PH) >= 9 and float(PH) <= 14:
            phlevel = 'Alkaline'
        # return render_template("index.html",cont=[crop_name,humidity_level,temperature_level,rainfall_level,N_level,P_level,potassium_level,phlevel])
        return render_template("Display.html",cont=[N_level,P_level,potassium_level,humidity_level,temperature_level,rainfall_level,phlevel],values=[N,P,K,Humidity,Temperature,Rainfall,PH],cropName=crop_name,)

    return render_template("index.html")

@app.route("/user/<usr>")
def user(usr):
    return f"<h1> Hi {usr} !</h1>"

# @app.route("/user")
# def user():
#     if "user" in session:
#         user=session['user']
#         return f"<h1> hi {user} </h1>"
#     return render_template("login.html")

if __name__=="__main__":
   app.run(debug=True)
  