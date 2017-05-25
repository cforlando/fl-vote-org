# #flvote
Tweet To Vote on Florida Bills. A Tabs on Tallahassee - Code for Orlando Project

[![Build Status](https://travis-ci.org/cforlando/fl-vote-org.svg?branch=master)](https://travis-ci.org/cforlando/fl-vote-org)

The [Tabs on Tallahassee Hackathon](http://www.meetup.com/Code-For-Orlando/events/227297615/) at Canvs Orlando, FL on Jan. 16, 2016 inspired this project. The goal of the Hackathon was to use the new [Tabs on Tallahassee API](https://tabsontallahassee.com/api/) to build a digital tool that makes data from the Florida House and/or Senate easier to access and that will help everyday citizens find legislation that matters to them.

Team Members:
- Cassandra Wilcox
- Charlie Behrens
- Eli Murray
- Ian Grail
- Stacey Baldini

Our team created a website, FLVote.org, to harness Twitter to influence Bills in the Florida Legislature. The website works with 3 easy steps:
 1. Pick the Bill
 2. Vote Yes or No to create your tweet
 3. Share it on Twitter

The website also presents a tally of Yes and No tweets for each State Bill.

View the application here: http://www.flvote.org


# RethinkDB Database Deployment
- Currently Hosted by Code Hangar on Digital Ocean
- Running with docker image 2.3.5 `RETHINKDB_PACKAGE_VERSION=2.3.5~0jessie`
- Run Command: `docker run --name flvote -v "$PWD:/data" -p 8080:8080 -p 28015:28015 -p 29015:29015 -d rethinkdb`
- Contact @grailian for DB support issues