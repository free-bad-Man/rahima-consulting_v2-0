(async ()=>{
  try{
    const {PrismaClient} = require('@prisma/client');
    const p = new PrismaClient({datasources:{db:{url:process.env.PRISMA_DATABASE_URL}}});
    await p.$connect();
    console.log('prisma connect ok');
    const res = await p.$queryRaw('SELECT tablename FROM pg_tables WHERE schemaname=\'public\' ORDER BY tablename LIMIT 5;');
    console.log('sample tables:', res);
    await p.$disconnect();
  }catch(e){
    console.error('prisma error', e);
    process.exit(2);
  }
})();
