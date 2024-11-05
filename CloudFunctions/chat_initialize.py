#   Title: Cloud function for pub sub   
#   @author - Sagarkumar Pankajbhai Vaghasia
#   Availability: https://stackoverflow.com/questions/62282170/whats-the-best-way-to-send-an-e-mail-via-python-google-cloud-function
#   Availability: https://stackoverflow.com/questions/65161914/calling-firestore-from-python-cloud-function-and-app-initialization


import smtplib
import base64
import json
import datetime
from google.cloud import firestore
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

#This function is used to send email from the admin of the web app to the restaurant owner 

def send_email(receiver, subject, body):
   
    gmail_user = 'sagarvaghasia372.ss@gmail.com'
    gmail_app_password = "qicsheyorgsskicm"
    sent_from = gmail_user
    sent_to = [receiver]
    sent_subject = subject
    sent_body = body

    
    message = MIMEMultipart()
    message['Subject'] = subject
    message['From'] = sent_from
    message['To'] = ', '.join(sent_to)
    part = MIMEText(body, "plain")
    message.attach(part)
    message.preamble = 'Decision'

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(gmail_user, gmail_app_password)
        server.sendmail(sent_from, sent_to, message.as_string())
        server.close()
        print('Email sent!')
    except Exception as exception:
        print("Error: %s!\n\n" % exception)

def chatroom(request):
    request_json = request.get_json()
    request_args = request.args

    message = base64.b64decode(request_json['message']['data']).decode('utf-8')
    message1 = json.loads(message)
    print(message1)
    print(type(message1))
    print(message1.keys())

    db = firestore.Client()
    doc_ref = db.collection(u'chat').document(str(message1["id"]))
    doc_ref.set({
        u'customerName': str(message1["cname"]),
        u'customerEmail': str(message1["cemail"]),
        u'restaurantName': str(message1["rname"]),
        u'restaurantEmail': str(message1["remail"]),
        u'customerComplaint': str(message1["complaint"]),
        u'ompalintStatus': True,
        u'chatRoomCreatedAt': datetime.datetime.now(),
        
    })
    
    send_email(message1["remail"], "chat room link", "http://localhost:3000/chat/" + message1["id"])

    if request_json and 'name' in request_json:
        name = request_json['name']
    elif request_args and 'name' in request_args:
        name = request_args['name']
    else:
        name = 'Error'
    return 'Failed {}!'.format(name)