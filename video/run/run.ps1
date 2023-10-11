cd "C:\Program Files\obs-studio\bin\64bit\"
.\obs64.exe

cd C:\Users\Admin\PycharmProjects\2023-CCH-PO-Circuit-et-API\video\venv\
Scripts/activate

cd ../
python.exe -m uvicorn main:app --reload --host 192.168.1.100 --port 80 