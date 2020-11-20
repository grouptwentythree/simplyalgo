## How to run

Running frontend React app / GUI: 
``` cd gooey && npm start ```

Running backend Express.js: <br/>
<code> cd gooey </code> <br/>
<code> cd api </code> <br/>
<code> npm start </code> <br/> 
alternatively, you can run <code> nodemon api </code> instead of <code> npm start </code> to get hot refresh for the express backend

## List of SQL Queries:
- [x] SELECT to login/authenticate users
- [ ] CREATE and INSERT tables (Use CREATE to create new tabels)
- [ ] INSERT, DELETE, UPDATE (Use INSERT and DELETEto add, remove clients. Use UPDATE to change attributes of a client)
- [ ] user-specified SELECT query (Use SELECT(name) on Brokerage to get all brokerage's name in the tabel)
- [ ] PROJECT query 
- [ ] JOIN query (Use JOIN on use-build(aid, cid) with Algotrader(aid) and Client(cid) to get all interactions between clients and algotraders)
- [ ] AGGREGATION query -(Use JOIN on Algotrader(aid) and Use-build(aid), then use SELECT SUM(fee) to determine total profits made)
- [ ] NESTED AGGREGATING with GROUP BY (Use JOIN on Algotrader(aid) and Use-build(aid) tabel, then use SELECT SUM(fee) GROUP BY id to determine total profits made for each algotrader)
- [ ] DIVISION (Use use-build tabel DEVIDE (SELECT aid FROM Algotrader) to get clients that have interacted with all algotraders)

note: Users should only be able to make queries that make sense from a user's POV (filtering algotraders by fee or price..etc), users shouldn't be able to look up other users. 

## Useful Links:

<ul> [Criteria](https://canvas.ubc.ca/courses/53546/files/11257052?module_item_id=2572710) /<ul>
