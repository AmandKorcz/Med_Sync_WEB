// generateHash.js
import bcrypt from 'bcrypt';

async function generateHash() {
  const senha = "1234";
  const hash = await bcrypt.hash(senha, 10);
  console.log("Hash gerado:", hash);
}

generateHash().catch(console.error);