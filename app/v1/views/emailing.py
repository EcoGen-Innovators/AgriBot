import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from os import environ
from typing import List
from dotenv import load_dotenv

load_dotenv()

def send_email(recipient_emails: List, subject: str, message: str) -> None:
    # Sender's email credentials
    sender_email = environ.get('MAIL_USERNAME')
    sender_password = environ.get('MAIL_PASSWORD')

    # SMTP server details
    smtp_server = environ.get('MAIL_SERVER')
    smtp_port = environ.get('MAIL_PORT')

    # Create a multi-part email message
    email_message = MIMEMultipart()
    email_message['From'] = sender_email
    email_message['To'] = recipient_emails
    email_message['Subject'] = subject

    # Attach the message to the email
    email_message.attach(MIMEText(message, 'plain'))

    try:
        # Create an SMTP connection
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            # Start the connection
            server.ehlo()
            server.starttls()
            server.ehlo()
            print(sender_email, sender_password)
            # Login to the sender's email account
            server.login(sender_email, sender_password)
            print('Login successful')
            # Send the email
            server.sendmail(sender_email, recipient_emails, email_message.as_string())

        print('Email sent successfully!')
    except Exception as exception:
        print('Error sending email:', str(exception))
