import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email_alert(recipient_email, subject, message):
    # Sender's email credentials
    sender_email = 'your_sender_email@example.com'
    sender_password = 'your_sender_password'

    # SMTP server details
    smtp_server = 'your_smtp_server'
    smtp_port = 587

    # Create a multi-part email message
    email_message = MIMEMultipart()
    email_message['From'] = sender_email
    email_message['To'] = recipient_email
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

            # Login to the sender's email account
            server.login(sender_email, sender_password)

            # Send the email
            server.sendmail(sender_email, recipient_email, email_message.as_string())

        print('Email sent successfully!')
    except Exception as e:
        print('Error sending email:', str(e))

# Example usage
recipient_email = 'user@example.com'
email_subject = 'Hello from your website!'
email_message = 'This is a test email alert from your website.'

send_email_alert(recipient_email, email_subject, email_message)