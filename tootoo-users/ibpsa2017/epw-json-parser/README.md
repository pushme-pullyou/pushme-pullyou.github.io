<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://ibpsa2017.github.io/epw-json-parser/#README.md "View file as a web page." ) </span>


[EPW Parser Read Me]( https://ibpsa2017.github.io/index.html#epw-json-parser/README.md )
====


<iframe class=iframeReadMe src=https://ibpsa2017.github.io/epw-json-parser/index.html width=100% height=600px ></iframe>

## Full Screen: [EPW Parser]( https://ibpsa2017.github.io/epw-json-parser/index.html )

## Concept

The challenge: Can you show 365 x 24 x 8 items of weather data all at once in a readable manner?

As bad as this fail is, it's still the most promising of all the demos here. It shows the ways of visualizing weather data in entirely new ways.



## About
From: https://energyplus.net/weather/simulation

> Weather data for more than 2100 locations are now available in EnergyPlus weather format — 1042 locations in the USA, 71 locations in Canada, and more than 1000 locations in 100 other countries throughout the world. The weather data are arranged by World Meteorological Organization region and Country.

> Users of energy simulation programs have a wide variety of weather data from which to choose – from locally recorded weather data to preselected 'typical' years –, often a bewildering range of options. Many locations are available on this site – but users may have special needs for different locations. This page lists sites that may provide those other user locations. Before tapping the resources below, users should check if an existing EnergyPlus Weather Format (EPW) file is within 20-30 miles (30-50 km) and within a few hundred feet (100 m) of elevation.


## Original text for this effort:


The following text was written the week before the conference workshop. It is based on a JSON conversion of EPW data supplied by [Matthew Dahlhausen]( https://github.com/mDahlhausen ) and available here:

[SF_example_data.csv]( https://github.com/ibpsa2017/ibpsa2017.github.io/blob/master/data/SF_example_data.csv )

This early release - with San Francisco data only - is viewable here:

### [EPW Parser R2]( https://ibpsa2017.github.io/epw-json-parser/archive/epw-parser-r2.html )

Matthew Dahlhausen's excellent EPW data file viewer does an excellent fob of rendering the statistics in 2D and is available here:

### [epwvis]( https://github.com/mdahlhausen/epwvis )


Immediatelly following the conference, a new version of the script was created that accesses the climaJSON files from [eco-envolventes]( http://www.eco-envolventes.net/ ) - a research project at the [Universidad de Piloto]( http://www.unipiloto.edu.co/ ), Bogota, Colombia

The new version is shown in the view above and will described in a blog post.


## First Forays: Hacking Conferences Nicely

The EPW Parser is my first foray onto displaying EnergyPlus weather (EPW) data in 3D. The challenge: Can you show 365 x 24 x 8 items of weather data all at once in a readable manner?

Let us just say that this little effort has aspects that are interesting.

But the main thing is that we are up and running. And there is a **much bigger challenge at hand**. This new challenge is to see: can create new material during the conference itself? Can we stop mucking around with last year's PDFs. Instead, can live in the moment and create and design or identify some new patterns based on what we are seeing and hearing in the sessions?

Have you ever participated in a [hackathon]( https://en.wikipedia.org/wiki/Hackathon ). There is a liveness - and a lack of sleep - contrasts markedly with the usual demeanor at traditional style conferences.

There's nothing particularly right or wrong about either type of meet-up. But I'm thinking it might be fun to bring in some hacking thoughts - nice ones - into the process.

Things I want to do include:

* Looking at some complex visualization or analysis and seeing if it's possible to create some of the effect with eazy peazy, beginner level code
* Respond to any 'I bet you can't do this' challenges
* Explore ways of communicating / simulating with participants

There are two important side aspects to this thinking

* Helping beginners get started with code they can understand and use to perform helpful tasks
* Helping full-stack developers tackle even more advanced work because they know the lowend is being taken of 

Of course, everything will be free and open source and available on GitHub with links from this site.

Bye for now...

Theo


## Links of Interest

* https://energyplus.net/weather
* https://github.com/mdahlhausen/epwvis
	* https://github.com/mdahlhausen/epwvis/wiki
* https://www.nrel.gov/analysis/sam/help/html-php/index.html?weather_format.htm



## To Do

* 2017-08-15 ~ Allow you to select which variables are to be displayed and on which access


## Issues

* Would it make sense to upload all the EPW files to GitHub so that can be accessed online?


## Change Log


### 2017-08-15 ~ Theo

* Beginning to work as desired.

### 2017-08-02 ~ 

* First commit