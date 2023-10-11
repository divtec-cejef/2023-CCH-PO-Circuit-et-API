import os
from ftplib import FTP
from dotenv import load_dotenv

load_dotenv()

ftp = FTP(os.environ['FTP_URL'], os.environ['FTP_USERNAME'], os.environ['FTP_PASSWORD'])
ftp.cwd(os.environ['FTP_DIRECTORY_PATH'])


def upload_file(local_file_path: str, uploadname: str):
    """
    Permet de téléverser un fichier sur le ftp
    :param local_file_path: chemin du fichier en local
    :param uploadname: nom du fichier sur le ftp
    :return: none
    """
    f = open(local_file_path, 'rb')
    ftp.storbinary('STOR ' + uploadname, f)
    f.close()

