var mysql = require('mysql');

var abstract_db = function()
{

  this.connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database :  'db_EldestAssistant'
  })

  this.mysql_delete= function(table,where)
  {
    var query = "DELETE FROM " + table + " ";
    query += "WHERE " + where;
    console.log(new Date()+" : ");
    console.log(query);
    return query;
  }


  this.mysql_update =function (table,set,where)
  {
    var query = "UPDATE " + table + " SET ";
    var i = 1;
    for (x in set)
    {
      query += set[x]+" ";
      if (i < set.length)
      {
        query += ",";
      }
      i++;
    }
    query += "WHERE " + where;
    console.log(new Date()+" : ");
    console.log(query);
    return query;
  }

  this.mysql_select = function(select,from,where,orderby,limit)
  {
    var query = "SELECT " + select + " FROM ";
    var i = 1;
    for (x in from)
    {
      query += from[x]+" ";
      if (i < from.length)
      {
        query += ",";
      }
      i++;
    }
    if(where != "" && where != null)
    {
      query += "WHERE " + where + " ";
    }
    if(orderby != "" && orderby != null)
    {
      query += "ORDER BY " + orderby;
    }
    if(limit != "" && limit != null)
    {
      query += "LIMIT " + limit;
    }
    console.log(new Date()+" : ");
    console.log(query);
    return query;
  }

  this.mysql_insert = function(table, columns, values)
  {
    var query = "INSERT INTO " + table + " ";
    var i = 1;
    for (x in columns)
    {
      if (i == 1)
      {
        query += "(";
      }
      query += columns[x]+" ";
      if (i < columns.length)
      {
        query += ",";
      }
      if (i == columns.length)
      {
        query += ") ";
      }
      i++;
    }
    query += "VALUES ";
    i = 1;
    for (x in values)
    {
      if (i == 1)
      {
        query += "(";
      }
      query += values[x]+" ";
      if (i < values.length)
      {
        query += ",";
      }
      if (i == values.length)
      {
        query += ") ";
      }
      i++;
    }
    console.log(new Date()+" : ");
    console.log(query);
    return query;
  }

  this.AddQuote= function(mot)
  {
    return "'"+mot+"'";
  }

}

module.exports = new abstract_db();
