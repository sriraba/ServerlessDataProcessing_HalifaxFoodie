# Title: Validate Second Factor Details with Firestore data
# Author: Sri Ramya Basam
# Date: 2022/11/09
# Availability: https://firebase.google.com/docs/firestore/quickstart

from google.cloud import firestore
import json

#validate second factor details 
def hello_world(request):
    
    request_json = request.get_json()
    values = []
    for k,v in request_json.items():
        print("key",k)
        print("value",v)
        values.append(v)
    print(values)
    return get_second_factor_details(values)
    


def get_second_factor_details(values):    
    print("get_second_factor_details")
    db = firestore.Client()
    doc_ref = db.collection(u'usersSecondFactorLookup').document(values[0])    
    doc = doc_ref.get()
    if doc.exists:
        my_dict= doc.to_dict()
        print(f'Document data: {my_dict}')
        if my_dict['question'] == values[1] and my_dict['answer'] == values[2]:
            response = {"headers":{"Access-Control-Allow-Origin":"*"},
                "body":{"message":"data is valid","status":"pass"}}
        else:
            response = {"headers":{"Access-Control-Allow-Origin":"*"},
                "body":{"message":"data is not valid","status":"fail"}}
    else:
        response = {"headers":{"Access-Control-Allow-Origin":"*"},
                "body":{"message":"data is not valid","status":"fail"}}
    print(response)
    send_response = json.dumps(response)
    print(send_response)
    return send_response