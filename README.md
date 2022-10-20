# MANUALE INSTALLAZIONE GEOVIEWER

# INDICE

[1 COMPONENTI](#1-componenti)

[2 REQUISITI](#2-requisiti)

[3 PREPARAZIONE AMBIENTE](#3-preparazione-ambiente)

[4 CONFIGURAZIONE AMBIENTE](#4-configurazione-ambiente)

[5 COMPILAZIONE](#5-compilazione)

[6 DEPLOY ](#6-deploy)

[7 TEST](#7-test)

# 1 COMPONENTI  
I componenti rilasciati sono i seguenti:

- **GEOVIEWER** : Libreria per sviluppo applicazioni cartografiche

# 2 REQUISITI
Per L'installazione dell'ambiente di sviluppo:
- **NODE.JS 14** : Ambiente Node Versione 14
- **GIT**: Software git

Per L'installazione dell'ambiente di deploy:
- **Java 1.8.0** 
- **Tomcat 8.5**: 

# 3 PREPARAZIONE AMBIENTE
Clonare il progetto git in apposita directory ```<DEV_HOME>```
```
cd <DEV_HOME>
git clone https://github.com/Liguria-Digitale/Geoviewer.git
```
Installazione ambiente
```
npm install
``` 

# 4 CONFIGURAZIONE AMBIENTE
Modificare il file ```<DEV_HOME>\config\index.js``` per impostare i valori dei parametri di configurazione: "proxyTable" e "baseDeployDir"

Modificare il file ```<DEV_HOME>\script\create-btn.js``` per impostare il valore del parametro "basePath"


# 5 COMPILAZIONE 
Eseguire il comando
```
npm run build
```
Il codice della libreria viene compilato nella dir: ```<DEV_HOME>/dist```

# 6 DEPLOY
Il deploy della libreria e delle applicazioni consiste nella copia dei file in una cartella sotto un application server Tomcat

Il contenuto della cartella ```<DEV_HOME>/pages/apps/```, contente le librerie deve essere copiata nella cartella ```<CATALINA_HOME>/webapps/geoservices/apps/viewer/dist```

Le applicazioni devono essere copiate dalla cartella ```<DEV_HOME>/pages/apps/``` alla cartella ```<CATALINA_HOME>/webapps/geoservices/apps/viewer/pages/apps/``` 

# 7 TEST
Nel software di installazione è presente una app di test ```<DEV_HOME>/pages/apps/test/```

Accesso alla app di test:
```
https://<TOMCAT_SERVER>/geoservices/apps/geoviewer/pages/apps/test
```