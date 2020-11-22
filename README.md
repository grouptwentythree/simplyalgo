## How to run

Running frontend React app / GUI: 
``` cd gooey && npm start ```

Running backend Express.js: <br/>
<code> cd gooey </code> <br/>
<code> cd api </code> <br/>
<code> npm start </code> <br/> 

Open another terminal<bt/>
To open the GUI webpage: <br/>
<code> cd gooey </code> <br/>
<code> npm start </code> <br/> 

alternatively, you can run <code> nodemon api </code> instead of <code> npm start </code> to get hot refresh for the express backend

## List of SQL Queries:
- [x] SELECT to login/authenticate users
- [x] CREATE and INSERT tables (Use CREATE to create new tabels)
- [x] INSERT, DELETE, **UPDATE** (Use INSERT and DELETEto add, remove clients. Use UPDATE to change attributes of a client)
- [x] user-specified SELECT query (Use SELECT(name) on Brokerage to get all brokerage's name in the tabel) **look for brokers that can integrate with your broker**
- [X] PROJECT query **what is this**
- [x] JOIN query (Use JOIN on use-build(aid, cName) with Algotrader(aid) and Client(cName) to get all interactions between clients and algotraders)
- [x] AGGREGATION query -(Use JOIN on Algotrader(aid) client(cName) and Use-build(aid), then use SELECT C.cName SUM(fee) to determine total profits made by each client) 1. **portfolio, given user id, sum all unique holdings from all the algotrader that the user owns..?** 
- [x] NESTED AGGREGATING with GROUP BY (Use JOIN on Algotrader(aid) and Use-build(aid) tabel, then use SELECT id SUM(fee) GROUP BY id to determine total profits made for each algotrader)
- [x] DIVISION (Use use-build tabel DEVIDE (SELECT aid FROM Algotrader) to get clients that have interacted with all algotraders)

note: Users should only be able to make queries that make sense from a user's POV (filtering algotraders by fee or price..etc), users shouldn't be able to look up other users. 

## Useful Links:

<ul> [Criteria](https://canvas.ubc.ca/courses/53546/files/11257052?module_item_id=2572710) /<ul>
