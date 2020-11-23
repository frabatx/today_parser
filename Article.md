# Data Journalism



## Cosa succede in una delle migliori cittá d'Italia?

Il Sole 24 Ore rilascia ogni anno stila la classifica delle cittá italiane per qualitá della vita. Questo tipo di indagine viene redatta da circa 30 anni ed ha visto la provincia di Trento numerose volte sul podio della classifica finale, specialmente negli ultimi vent'anni. Questa vuole essere una analisi esplorativa che vede protagonista TrentoToday che dal 2011 ha pubblicato circa 30 mila articoli per la cittá e per tutta la provincia fornendo un bacino di dati non indifferente. 

Verranno analizzati i soli articoli del giornale con la consapevolezza che questa non sia una analisi oggettiva sulla totalitá dei fatti accaduti in provincia ne una rappresentazione valida per trarre alcuna giudizio giornalistico sulla testata presa in esame. La scelta di TrentoToday é data dal fatto che gli articoli seguono degli standard di pubblicazione che favoriscono la raccolta dati, inoltre per la maggior parte delle notizie viene fornita una geolocalizzazione che permette un analisi territoriale degli stessi. 

## Metodologia

La metodologia applicata si divide in 3 fasi: raccolta dati, manipolazione dati e analisi. 

**Raccolta dati**

Attraverso tecniche di Web Scraping dalla piattaforma sono stati raccolti 28.681 articoli, dal Novembre 2011 a Novembre 2020. I dati da qui ottenuti sono:

* Titolo
* Sottotitolo
* Testo
* Timestamp
* Indirizzo
* Keywords

Le Keywords sono le parole chiave relative all'articolo, vengono utilizzate per specificare l'argomento dell'articolo e velocizzare le ricerche sul web.

**Manipolazione dati**

In questa fase sono state utilizzate le informaizoni in possesso per aumentare la quantitá di informazione a disposiozione. Attraverso OpenStreetMap e i dati ufficiali Istat sulle municipalitá italiane sono state aggiunte: Latitudine, Longitudine, Comune, Quartiere (solo per il comune di Trento).

## Analisi

Le analisi applicate ai dati raccolti sono di due tipi. Per prima una analisi temporale. Qui vengono analizzati gli andamenti delle keyword e degli articoli nel tempo. In fine una analisi geografica che utilizza i soli dati geolocalizzabili.

Al fine di diminuire il numero di keyword uniche utilizzate dalla testata giornalistica (4850) si é cercato una relazione tra di esse per poter escludere quelle che avevano una forte co-occorrenza. Si é scoperto che questo tipo di relazione superava il 40% solo in pochissime keywords portando alla esclusione questo tipo di approccio. **(non penso ci sia bisogno di un grafico)**

#### Analisi Temporale

Come prima cosa si é scelto di analizzare il numero di articoli annuo prodotto da TrentoToday. 

**GRAFICO ANNUALE**

Come si vede dal grafico non c'é alcuna sostanziale crescita o decrescita nel numero annuale di articoli pubblicato. In genere si parla di una media di 3000 articoli l'anno che possono variare nell'ordine di un centinaio di articoli. I dati del 2020 non sono completi poiché si fermano ad inizio novembre ma si puó presumere un abbassamento delle pubblicazioni come avviene ogni anno in questo periodo. Infatti la seconda analisi riguarda l'andamento mensile delle pubblicazioni degli articoli. 

**GRAFICO MENSILE**

A spiccare (spiccare?) sono proprio alcuni mesi che vedono un picco di crescita di centinaia di articoli. I mesi in questione sono spesso quelli di ritorno dalle vacanze estive, Settembre ed Ottobre. Il 2020 é un anno particolare da questo punto di vista, complice la pandemia. Infatti vediamo come nei mesi di Marzo ed Aprile le pubblicazioni siano piú alte della norma, mentre il picco minimo si tocchi ad Agosto. 