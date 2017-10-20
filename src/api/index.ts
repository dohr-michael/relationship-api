import * as express from 'express';
import * as bodyParser from 'body-parser';
import { handlers } from '../services';


const context = {};


const router = express.Router();

router.use( '/model.json', bodyParser.urlencoded() , handlers( context ) );
