import db from '../DB/mysql.js'

const pool = db.pool;

const TABLE = 'vendedor';

const Model = {
    createRecord: (data) => db.createRecord(TABLE, data),
    updateRecord: (data, conditions = {}) => db.updateRecord(TABLE, data, conditions),
    findRecords: (conditions = {}, limit = null) => db.findRecords(TABLE, conditions, limit),
    findOneRecord: (conditions = {}) => db.findOneRecord(TABLE, conditions),
    deleteRecord: (conditions = {}) => db.deleteRecord(TABLE, conditions),
    pool: pool
};

export default Model;