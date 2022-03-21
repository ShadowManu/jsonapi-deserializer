import { matches } from 'lodash';

import { deserialize } from '../src/index';
import { Document } from '../src/interfaces';

describe('deserialize', () => {

  it('should deserialize jsonapi spec example', () => {
    let example: Document = {
      'data': [{
        'type': 'articles',
        'id': '1',
        'attributes': {
          'title': 'JSON API paints my bikeshed!'
        },
        'links': {
          'self': 'http://example.com/articles/1'
        },
        'relationships': {
          'author': {
            'links': {
              'self': 'http://example.com/articles/1/relationships/author',
              'related': 'http://example.com/articles/1/author'
            },
            'data': { 'type': 'people', 'id': '9' }
          },
          'comments': {
            'links': {
              'self': 'http://example.com/articles/1/relationships/comments',
              'related': 'http://example.com/articles/1/comments'
            },
            'data': [
              { 'type': 'comments', 'id': '5' },
              { 'type': 'comments', 'id': '12' }
            ]
          }
        }
      }],
      'included': [{
        'type': 'people',
        'id': '9',
        'attributes': {
          'first-name': 'Dan',
          'last-name': 'Gebhardt',
          'twitter': 'dgeb'
        },
        'links': {
          'self': 'http://example.com/people/9'
        }
      }, {
        'type': 'comments',
        'id': '5',
        'attributes': {
          'body': 'First!'
        },
        'relationships': {
          'author': {
            'data': { 'type': 'people', 'id': '2' }
          }
        },
        'links': {
          'self': 'http://example.com/comments/5'
        }
      }, {
        'type': 'comments',
        'id': '12',
        'attributes': {
          'body': 'I like XML better'
        },
        'relationships': {
          'author': {
            'data': { 'type': 'people', 'id': '9' }
          }
        },
        'links': {
          'self': 'http://example.com/comments/12'
        }
      }]
    };

    let result: any = deserialize(example);

    let expected = [
      {
        'type': 'articles',
        'id': '1',
        'title': 'JSON API paints my bikeshed!',
        'author': {
          'type': 'people',
          'id': '9',
          'first-name': 'Dan',
          'last-name': 'Gebhardt',
          'twitter': 'dgeb'
        },
        'comments': [
          { 'type': 'comments', 'id': '5', 'body': 'First!' },
          { 'type': 'comments', 'id': '12', 'body': 'I like XML better' }
        ]
      }
    ];

    expect(matches(expected)(result)).toBe(true);
  });

  it('should deserialize nested resources', () => {
    let document: Document = {
      data: [
        {
          id: '1', type: 'people', attributes: { name: 'John' },
          relationships: { friend: { data: { id: '2', type: 'people' } } }
        },
        {
          id: '2', type: 'people', attributes: { name: 'Carl' },
          relationships: { dog: { data: { id: '3', type: 'dogs'} } }
        }
      ],
      included: [
        {
          id: '2', type: 'people', attributes: { name: 'Carl' },
          relationships: { dog: { data: { id: '3', type: 'dogs'} } }
        },
        { id: '3', type: 'dogs', attributes: { name: 'Bobby' } }
      ]
    };

    let result: any = deserialize(document);

    let expected = [
      { type: 'people', id: '1', name: 'John', friend: { type: 'people', id: '2', name: 'Carl', dog: { type: 'dogs', id: '3', name: 'Bobby' } } },
      { type: 'people', id: '2', name: 'Carl', dog: { type: 'dogs', id: '3', name: 'Bobby' } }
    ];

    expect(matches(expected)(result)).toBe(true);
  });

});
