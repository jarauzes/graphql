REFERENCE: https://babeljs.io/<br/>
REFERENCE: https://github.com/prisma/graphql-yoga<br/>
<h2>uuidv3</h2>
REFERENCE: https://github.com/kelektiv/node-uuid#readme<br/>
<h2>Spread Operator</h2>
REFERENCE: https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread<br/>
...ARRAY<br/>
<br/>
<h2>Enum</h2>
1. A special type that defines a set of constants<br/>
2. This tyoe can then be used as the type for a field (similar to scalar and custom object types)<br/>
3. Values for the field must be one of the constants for the type<br/>
<br/>
Example: UserAdmin [standard, editor, admin]<br/>
<br/>
<h2>Prisma</h2>
<p><b>replaces traditional (ORM's) Object-relational mapping</b><br/>
- Simplified & type-safe database access<br/>
- Declarative migrations & data modeling<br/>
- Powerful & visual data management<br/></p>
<br/>
<h2>Integrating Prisma into a Node.js Project</h2>
REFERENCE: https://github.com/prisma/prisma-binding<br/>
<code>$ npm run get-schema</code> - to fetch latest schema<br/>
<p>Database Schemas to PostgreSQL: datamodel.graphql</p>
<code>$ prisma deploy</code> - to fetch latest schema<br/>
<code>$ prisma delete</code> - to delete all in Database<br/>
<code>$ npm run get-schema</code> - to renew all scheme<br/>
<br/>
<h2>GraphQL Fragment</h2>
<p>
Let's say we had a relatively complicated page in our app, which let us look at two heroes side by side, along with their friends. You can imagine that such a query could quickly get complicated, because we would need to repeat the fields at least once - one for each side of the comparison.
</p>