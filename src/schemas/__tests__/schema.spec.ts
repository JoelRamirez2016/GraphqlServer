import { GraphQLFieldMap } from 'graphql';
import { schema } from '../schema';

describe('Test Static Schema Snapshot', () => {    
  const testSchema = (name: string) => {
    const type = schema.getType(name);    
    expect(type).not.toBeNull();
    expect(type).toBeDefined();    
  }
  test('schema should contain types Client', () => testSchema("Client"));        
  test('schema should contain types User', () => testSchema("User"));        
  test('schema should contain types Terminal', () => testSchema("Terminal"));          
  // testSchema("Transaction");    
});

describe('Test Queries', () => {
      
  test("test query", () => {    
    const Query = schema.getQueryType()?.getFields() as GraphQLFieldMap<any,any>;    

    const resolver = Query.user.resolve as Function;
    const r = resolver(null, { id: "" });
    console.log(r);
      
  })    
})

// schema.getDirectives