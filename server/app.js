import express from 'express';
import bodyParser from 'body-parser';
// Importing routes
import messages from './routes/message';

const app = express();
// Bordy parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use routes
app.use('/api/v1/messages', messages);

// Handler for 404 - Resource Not Found
app.use((req, res) => {
  res.status(404).send('Resource Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
export default app;
