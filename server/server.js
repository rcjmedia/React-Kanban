const express = require('express');
const app = express();
const PORT = process.env.EXPRESS_CONTAINER_PORT || 5050;
const bp = require('body-parser');
const UserModel = require('./models/UserModel.js');
const PriorityModel = require('./models/PriorityModel.js');
const StatusModel = require('./models/StatusModel.js');
const CardModel = require('./models/CardModel.js');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('Sanity Check')
  res.send('Sanity Check')
})

/* 1. Show the kanban board */
app.get('/cards', (req, res) => {
  CardModel
    .fetchAll({withRelated: ["priority_id", "status_id", "created_by", "assigned_to"]})
    .then(carditems => {
      res.json(carditems.serialize())
      console.log('carditems: ', carditems)
    })
    .catch(err => {
      console.log('err: ', err)
      res.json('err')
    });
});

/* 2. Show a listing of users of the board */
app.get('/admin/users', (req,res)=> {
  UserModel
    .fetchAll()
    .then(items => {
      res.json(items.serialize());
    })
    .catch(err => {
      console.log(err, "ERR");
      res.json("err");
    })
})

/* 3. Show a form to add a new user */
app.post('/admin/users/new', (req, res) => {
  const newUserInput = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email  
  };
  return new UserModel()
    .save(newUserInput)
    .then(response => {
      return response.refresh();
    })
    .then(newUserData => {
      return res.json(newUserData);
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    });
});

/* 4. Detail view of user (Stretch goal) */
app.get('/admin/users/:id', (req, res) => {
  const { id } = req.params;
  UserModel.where('id', id)
    .fetch()
    .then(byUserId => {
      console.log('\nbyUserId: \n');
      res.json(byUserId);
    })
    .catch(err => {
      console.log('err', err);
      res.json('err');
    });
});

/* 5. Show form to let user update information (Stretch goal) */
app.put('/admin/users/:id/edit', (req, res) => {
  const { id } = req.params;
  const updatedUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email 
  };
  UserModel.where('id', id)
    .fetch()
    .then(userUpdateInput => {
      console.log('userUpdateInput', userUpdateInput);
      userUpdateInput.save(updatedUser);
      res.json(updatedUser);
      return null;
    })
    .catch(err => {
      console.log('err', err);
      res.json('err', err);
    });
});

/* 6. Show list of current priorities */
app.get('/admin/priorities/', (req,res)=> {
  PriorityModel
    .fetch()
    .then(items => {
      res.json(items.serialize());
    })
    .catch(err => {
      console.log('err', err);
      res.json('err', err);
    })
})

/* 7. Show form to add new Priority */
app.post('/admin/priorities/new', (req, res) => {
  const newPriorityInput = {
    name: req.body.name,
    rank: req.body.rank  
  };
  return new PriorityModel()
    .save(newPriorityInput)
    .then(response => {
      return response.refresh();
    })
    .then(newPriorityData => {
      return res.json(newPriorityData);
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    });
});

/* 8. Show form to update selected Priority */
app.put('/admin/priorities/:id/edit', (req, res) => {
  const { id } = req.params;
  const updatedPriority = {
    name: req.body.name,
    rank: req.body.rank  
  };
  PriorityModel.where('id', id)
    .fetch()
    .then(priorityUpdateInput => {
      console.log('priorityUpdateInput', priorityUpdateInput);
      priorityUpdateInput.save(updatedPriority);
      res.json(updatedPriority);
      return null;
    })
    .catch(err => {
      console.log('err', err);
      res.json('err', err);
    });
});

/* 9. Show list of current statuses */
app.get('/admin/statuses/', (req,res)=> {
  StatusModel
    .fetch()
    .then(items => {
      res.json(items.serialize());
    })
    .catch(err => {
      console.log('err', err);
      res.json('err', err);
    })
})

/* 10. Show form to add new Status */
app.post('/admin/statuses/new', (req, res) => {
  const newStatusInput = {
    name: req.body.name,
    rank: req.body.rank  
  };
  return new StatusModel()
    .save(newStatusInput)
    .then(response => {
      return response.refresh();
    })
    .then(newStatusData => {
      return res.json(newStatusData);
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    });
});

/* 11. Show form to update selected Status */
app.put('/admin/statuses/:id/edit', (req, res) => {
  const { id } = req.params;
  const updatedStatus = {
    name: req.body.name,
    rank: req.body.rank  
  };
  StatusModel.where('id', id)
    .fetch()
    .then(statusUpdateInput => {
      console.log('statusUpdateInput', statusUpdateInput);
      statusUpdateInput.save(updatedStatus);
      res.json(updatedStatus);
      return null;
    })
    .catch(err => {
      console.log('err', err);
      res.json('err', err);
    });
});

// DELETE  ---- Tested and Confirmed that this works in Postman
app.delete('/delete', (req, res) => {

  const card_id = req.body.card_id

  CardModel
    .where({ card_id })
    .destroy()
    .then(carditems => {
      res.json(carditems.serialize())
    })
    .catch(err => {
      console.log('DELETE ERR: ', err)
    })

})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
})