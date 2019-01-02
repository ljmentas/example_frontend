import React from 'react';
   import { Table, Header, Segment, Label } from 'semantic-ui-react'
   export default function ResultsTable({results}) {
       const rows = results.map(((result, index) => {
           let color;
           if (index === 0) {
               color='yellow';
           } else if (index === 1) {
               color='grey';
           } else if (index === 2) {
               color='orange';
           }
           return (
               <Table.Row key={ index }>
                   <Table.Cell>
                       <Label ribbon color={color}>{ index + 1 }</Label>
                   </Table.Cell>
                   <Table.Cell>{ result.word }</Table.Cell>
                   <Table.Cell>{ result.count }</Table.Cell>
               </Table.Row>
           );
       }));
       return (
           <div className="ui container">
               <Segment>
                   <Header>Results </Header>
                   <Table striped>
                       <Table.Header>
                           <Table.Row>
                               <Table.HeaderCell>Posicion</Table.HeaderCell>
                               <Table.HeaderCell>Palabra</Table.HeaderCell>
                               <Table.HeaderCell>Ocurrencia</Table.HeaderCell>
                           </Table.Row>
                       </Table.Header>
                       <Table.Body>
                           { rows }
                       </Table.Body>
                   </Table>
               </Segment>
           </div>
       );
   }
