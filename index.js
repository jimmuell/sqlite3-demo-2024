const Database = require('./db');

async function main() {
  const db = new Database();
  
  try {
    await db.init();
    await db.addUsers(['Alice', 'Bob', 'Charlie']);
    
    const users = await db.getUsers();
    users.forEach(user => {
      console.log(`${user.id}: ${user.name}`);
    });
  } catch (err) {
    console.error('Application error:', err);
  } finally {
    db.close();
  }
}

main();