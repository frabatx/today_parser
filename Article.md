# Data Journalism



## Cosa succede in una delle migliori cittá d'Italia?

Il Sole 24 Ore rilascia ogni anno stila la classifica delle cittá italiane per qualitá della vita. Questo tipo di indagine viene redatta da circa 30 anni ed ha visto la provincia di Trento numerose volte sul podio della classifica finale, specialmente negli ultimi vent'anni. Questa vuole essere una analisi esplorativa che vede protagonista TrentoToday che dal 2011 ha pubblicato circa 30 mila articoli per la cittá e per tutta la provincia fornendo un bacino di dati non indifferente. 

Sono stati analizzati i soli articoli del giornale con la consapevolezza che questa non sia una analisi oggettiva sulla totalitá dei fatti accaduti in provincia ne una rappresentazione valida per trarre alcuna giudizio giornalistico sulla testata presa in esame. La scelta di TrentoToday é data dal fatto che gli articoli seguono degli standard di pubblicazione che favoriscono la raccolta dati, inoltre per la maggior parte delle notizie viene fornita una geolocalizzazione che permette un analisi territoriale degli stessi. 

## Un pò di background

Attraverso tecniche di Web Scraping dalla piattaforma sono stati raccolti 28.681 articoli, dal Novembre 2011 a Novembre 2020. I dati da qui ottenuti sono: titolo, sottotitolo, testo, timestamp, indirizzo e keywords.

Le **keywords** sono le parole chiave relative all'articolo, vengono utilizzate per specificare l'argomento dell'articolo e velocizzare le ricerche sul web.

Per manipolazione dati invece si intende la modifica dei dati originali con lo scopo di facilitarne le analisi. Si tenga ben presente che per "modifica" non si intende "alterazione" ma solo una formattazione diversa. Inoltre Attraverso OpenStreetMap ed alcuni dati ufficiali Istat (vedere fonti) sono state aggiunti: latitudine, longitudine, comune, quartiere (solo per il comune di Trento). 

## Cosa succede?

Le analisi applicate ai dati raccolti sono di due tipi. Per prima una analisi temporale. Qui vengono analizzati gli andamenti delle keyword e degli articoli nel tempo. In fine una analisi geografica che utilizza i soli dati geolocalizzabili.

Al fine di diminuire il numero di keyword uniche utilizzate dalla testata giornalistica (4.850) si é cercato una relazione tra di esse per poter escludere quelle che avevano una forte co-occorrenza. Il risultato di questo procediemnto non ha portato evidenze di particolari relazioni tra le keyword, escludendo questo approccio. 

Gli argomenti generali piú trattati dal giornale sono quelle rappresentate dal grafico.

**GRAFICO BEST 50 KEYWORDS**

#### Analisi Temporale

Come prima cosa si é scelto di analizzare il numero di articoli annuo prodotto da TrentoToday. 

**GRAFICO ANNUALE**

Come si vede dal grafico non c'é alcuna sostanziale crescita o decrescita nel numero annuale di articoli pubblicato. In genere si parla di una media di 3000 articoli l'anno che possono variare nell'ordine di un centinaio di articoli. I dati del 2020 non sono completi poiché si fermano ad inizio novembre ma si puó presumere una decrescita nel numero delle pubblicazioni come avviene ogni anno per il periodo natalizio. 

A seguire una analisi delle pubblicazioni con cadenza mensile. 

**GRAFICO MENSILE**

**GRAFICO non so quale tipo di grafico va bene, probabilmente va bene anche inserire dei punti nel grafico precedente che facciano da toggle con queste informazioni, magari nei soli mesi di picco positivo e negativo**



| 11   | 2012-10-31 | 420  | incidenti, furti, scuola           |
| ---- | :--------: | :--- | ---------------------------------- |
| 107  | 2020-10-31 | 381  | coronavirus, contagi,dpcm          |
| 18   | 2013-05-31 | 352  | Incidenti, lavoro, basket          |
| 5    | 2012-04-30 | 351  | incidenti, calcio, furti           |
| 6    | 2012-05-31 | 350  | incidenti, manifestazioni          |
| 14   | 2013-01-31 | 348  | incidenti, elezioni                |
| 83   | 2018-10-31 | 347  | Elezioni provinciali, droga        |
| 106  | 2020-09-30 | 345  | Coronavirus, elezioni comunali     |
| 23   | 2013-10-31 | 340  | Elezioni provinciali,  carabinieri |
| 10   | 2012-09-30 | 334  | Incidenti, calcio                  |
| 42   | 2015-05-31 | 332  | Elezioni comunali, sindaco         |
| 7    | 2012-06-30 | 328  | Incidenti, calcio                  |
| 41   | 2015-04-30 | 325  | Elezioni comunali, candidati       |
| 22   | 2013-09-30 | 318  | Elezioni Provinciali, carabinieri  |
| 95   | 2019-10-31 | 314  | trasporti, Mobilitá                |



Il grafico mostra come nei primi anni 2012, 2013 gli argomenti principali fossero incentrati su **incidenti, calcio, ed elezioni**. Negfli anni a seguire si é raggiunto una produzione notevole di articoli solo in vista delle **elezioni sia provinciali che comunali**. Il 2020 é caratterizzato principalmente dal **coronavirus**.

I mesi che hanno visto una produzione piú bassa di articoli sono caratterizati da notizie sulla **viabilitá,** con **strade**, **montagna**, **incidenti**, **neve** , **morti** e **carabinieri**.



|      | timestamp  | counts | Common keywords                          |
| ---- | ---------- | ------ | ---------------------------------------- |
| 108  | 2020-11-30 | 86     | da non contare perché ha dati mancanti   |
| 0    | 2011-11-30 | 149    | da non contare perché ha dati mancanti   |
| 69   | 2017-08-31 | 169    | scuola, focus scuola, universitá         |
| 87   | 2019-02-28 | 185    | strade, neve, incidenti                  |
| 2    | 2012-01-31 | 191    | incidenti, tribunale, denunciati         |
| 88   | 2019-03-31 | 201    | strade, montagna, vigili del fuoco       |
| 63   | 2017-02-28 | 201    | incidenti, ambiente, montagna            |
| 1    | 2011-12-31 | 208    | da non contare perché ha dati mancanti   |
| 13   | 2012-12-31 | 208    | incidenti, furti, trasporti              |
| 89   | 2019-04-30 | 209    | strade, montagna, droga                  |
| 21   | 2013-08-31 | 214    | carabinieri, elezioni provinciali, furti |
| 62   | 2017-01-31 | 217    | turismo, neve, incendi                   |
| 59   | 2016-10-31 | 218    | morti, incidenti, strade                 |
| 31   | 2014-06-30 | 218    | carabinieri, coimuine, provincia         |
| 73   | 2017-12-31 | 219    | strade, viabilitá, lavori pubblici       |



Qui ci viene mostrato come ci sia una evidente differenza in numero di articoli tra alcuni periodi dell'anno. I mesi in cui ci sono picchi positivi sono spesso quelli di ritorno dalle vacanze estive, Settembre ed Ottobre, mentre i mesi poco caratterizzanti sono intorno alla fine del primo trimestre, Agosto e Dicembre. Il 2020 é un anno particolare da questo punto di vista, complice evidente la pandemia. Infatti vediamo come nei mesi di Marzo ed Aprile le pubblicazioni siano piú alte della norma, mentre il picco minimo si tocchi ad Agosto.

##### La pandemia ha indubbiamente influito sugli stili di vita delle persone di tutto il mondo ma come ha influito sulle notizie? 







####  Analisi Geografica

L'analisi geografica prende in considerazione solo il 76,8% degli articoli concentrandosi su quelli geolocalizzabili all'interno del territorio trentino(19.216 articoli).

**GRAFICO ARTICOLI NEI COMUNI VS ARTICOLI A TRENTO CON COLORI DELLA BANDIERA TRENTINA**

```
Numero di punti nei comuni:  7873
Numero di punti a Trento:  11343

Keywors più utilizzate nei comuni: 
 [['incidenti', 763], ['furti', 427], ['', 422], ['carabinieri', 376], ['morti', 366], ['strade', 335], ['incendi', 308], ['viabilità', 250], ['ambiente', 248], ['vigili del fuoco', 232], ['droga', 214], ['incidenti montagna', 212], ['notizie curiose', 210], ['montagna', 201], ['animali', 196], ['soccorsi alpino', 152], ['Elisoccorsi', 152], ['trasporti', 141], ['orsi', 137], ['sci', 134], ['lavoro', 134], ['rovereto', 126], ['natura', 117], ['turismo', 114], ['truffe', 110], ['traffico', 108], ['agricoltura', 103], ['incidenti stradali', 99], ['arresti', 96], ['incidenti motociclistici', 93], ['patente', 86], ['lago di garda', 83], ['sanità', 83], ['sport', 81], ['mobilità', 77], ['scuola', 76], ['comuni', 75], ['incidenti sul lavoro', 75], ['calcio', 73], ['incidente', 72], ['coronavirus', 69], ['indagini', 69], ['minori', 69], ['neve', 68], ['musica', 67], ['investimenti', 66], ['maltempo', 66], ['118', 65], ['storia', 65], ['alcol', 65]]
 
 
 Keywors più utilizzate a Trento: 
 [['', 1209], ['coronavirus', 448], ['università', 365], ['scuola', 329], ['lavoro', 328], ['meteo', 318], ['strade', 311], ['viabilità', 302], ['incidenti', 286], ['furti', 263], ['sport', 259], ['comune', 252], ['basket', 239], ['sanità', 234], ['politica', 231], ['droga', 217], ['traffico', 213], ['notizie curiose', 204], ['morti', 202], ['aquila basket', 201], ['trasporti', 198], ['volley', 181], ['orsi', 180], ['montagna', 176], ['neve', 176], ['sindacati', 170], ['ambiente', 169], ['weekend', 160], ['agricoltura', 159], ['salute', 157], ['animali', 156], ['a22', 156], ['turismo', 151], ['provincia', 150], ['studenti', 150], ['carabinieri', 143], ['lavori pubblici', 142], ['tribunale', 130], ['giovani', 129], ['dati', 126], ['immigrazione', 125], ['eventi', 124], ['autostrada del brennero', 122], ['feste', 122], ['maltempo', 119], ['storia', 118], ['musica', 117], ['economia', 116], ['vigili del fuoco', 116], ['scioperi', 115]]
```

### Trento VS Comuni

Il grafico mostra una prevalenza delle notizie su Trento in confronto a quelle con i comui, infatti i comuni occupano solo  il 41% delle notizie totali contro un 59% di prevalenza su Trento. 

> Non direi che era prevedibile, potrebbe essere dovuto a questa cosa, prima il dato, poi l'ipotesi. 

Sono riscontrate nei comuni piú notizie riguardanti incidenti, considerando le strade di montagna e la difficoltá di mobilitá durante l'inverno. Parlando invece dell argomento "furti" ha con "carabinieri" una relazione del 10%, questo significa che le due keywords sono usate assieme nella descrizione di un articolo nel 10% delle notizie riguardanti i furti.  

Ad uno sguardo superficiale si puó pensare che nei comuni ci siano piú notizie rispetto alla cittá, in realtá quelle notizie sono da dividere per il totale dei comuni, portando quindi le stesse ad una rilevanza minima rispetto a Trento. In particolare ´e curioso che il numero di notizie riguardanti le cittá sia direttamente proporzionale alla loro densitá di popolazione, almeno per le piú citate. Vediamo infatti il grafico che rappresenta da un lato il numero di articoli per cittá, dall'altro la densitá di popolazione. ("Ricordo che potrebbe essere un caso come potrebbe essere legato alla importanza che si da alla cittá")

CORONAVIRUS, COME HA INFLUENZATO LE NOTIZIE? mappa che fa vedere le seguenti notizie tra l'anno scorso e quest'anno. "incidenti, furti, rapine, morti"

### Centro storico VS Quartieri

> ci si é concentrati non va bene. Ci si potrebbe domandare va bene. 



Ci si potrebbe domandare a questo punto quali siano i quartieri piú popolari di trento e quali tipi di notizie ci siano. Escludendo i punti con geolocalizzazione generale "Trento" e che quindi venivano accorpati nel centro storico come da standard, sono presi in considerazione i soli articoli di Trento che contengono l'indirizzo completo e non solo il tag 'cittá'.  In particolare gli argomenti piú trattati  sono quelle facenti parte del tessuto sociale della cittá.  Il centro storico é quello piú rappresentativo che comprende dalla sua 4335 notizie contro i 997 della seconda San Giuseppe e della terza Bolghera 568.

Dal grafico **FARE IL GRAFICO DELLA QUANTITÁ DI NOTIZIE PER QUARTIERE** fare qualche considerazione su questa mappa mappa dei quartieri colorata per quantitá di articoli. Stessi colori.

**mappe di trento**

**MAPPA PRINCIPALI NOTIZIE/QUARTIERI** la mappa mostra gli argomenti popolari in relazione ai quartieri. (ha senso escludere quelli che non sono cosí frequenti? Ci fidiamo dei dati che abbiamo? Sono certi? Bisognerebbe specificarlo)

**CI SONO I PRESUPPOSTI PER UNO STUDIO SULLA CRIMINALITÁ A TRENTO? I numeri non ci portano in quella direzione ma sarebbe carino fare una analisi di droga, carabinieri e furti tra i quartieri di trento**

> Non ci sono dati che portino a pensare che a trento ci sia criminalitá, questa cosa é importante, anche se si vede un trend in crescita. 
>

## Conclusioni

Le analisi sopra condotte non forniscono una esatta descrizione di quello che é il tessuto sociale della cittá di Trento ne tantomeno dell'intera Provincia. Questo é solo uno specchio sulla societá che descrive il modo in cui essa viene rappresentata agli occhi del cittadino. 

Questo studio ha portato ad una sola conclusione, Trento merita la sua medaglia di bronzo,a **aumentare un pochino sta roba** 