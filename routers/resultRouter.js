const express = require('express');
const router = express.Router();
const VoteModel = require(`../models/voteModel`);


router.get(`/top5`, (req, res) =>
  {
    let candidates = [];
    let voters = [];
    let numVotes = [];
    let i = 0;
    let candidatesObj = [];
    VoteModel.getTop5().then((top5) =>
      {
        top5.map((row) =>
          {
            if (candidates.indexOf(row.candidate) === -1)
            {
              candidates.push(row.candidate);
              numVotes.push(row.numVotes);
            }
          }
        );
        candidates.map((candidate) =>
          {
            let obj = {};
            top5.map((row) =>
              {
                if (candidate === row.candidate)
                {
                  voters.push(row.name);
                }
              }
            )
            obj.candidate = candidate;
            obj.voters = voters;
            obj.numVotes = numVotes[i];
            i++;
            candidatesObj.push(obj);
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