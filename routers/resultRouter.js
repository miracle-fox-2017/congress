const express = require('express');
const router = express.Router();
const VoteModel = require(`../models/voteModel`);


router.get(`/top5`, (req, res) =>
  {
    let candidates = [];
    let numVotes = [];
    let i = 0;
    let candidatesObj = [];
    VoteModel.getTop5().then((top5) =>
      {
        top5.forEach((row) =>
          {
            if (candidates.indexOf(row.candidate) === -1)
            {
              candidates.push(row.candidate);
              numVotes.push(row.numVotes);
            }
          }
        );
        candidates.forEach((candidate) =>
          {
            debugger;
            let obj = {};
            let voters = [];
            top5.forEach((row) =>
              {
                if (candidate === row.candidate)
                {
                  debugger;
                  voters.push(row.name);
                }
              }
            )
            obj.candidate = candidate;
            obj.voters = voters;
            obj.numVotes = numVotes[i];
            candidatesObj.push(obj);
            i++;
          }
        )
        res.render(`top5`, {candidatesObj});
      }
    ).catch((err) =>
      {
        res.send(err);
      }
    );
  }
);



module.exports = router;