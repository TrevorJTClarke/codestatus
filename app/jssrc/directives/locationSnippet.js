/**
 * Location Snippet
 * A module for displaying a location snippet of verbose nature
 *
 * USE:
 * <location-snippet data='Object'></location-snippet>
 * OR:
 * let locationSnippet = require('./locationSnippet')
 * ${locationSnippet(Object)}
 *
 * Expected Data:
 * {
 * 	 name: 'ADX Portland', // required
 * 	 coords: '45.5196099,-122.6551053,90m' // GPS Coordinates to use with google API
 * }
 */
export default function locationSnippet(data) {
  if (!data || !data.name) return ``;

  let location = `
    <svg version="1.1" id="location" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
			<path d="M256,32c-79.529,0-144,64.471-144,144c0,112,144,304,144,304s144-192,144-304C400,96.471,335.529,32,256,32z M256,222.9 c-25.9,0-46.9-21-46.9-46.9s21-46.9,46.9-46.9s46.9,21,46.9,46.9S281.9,222.9,256,222.9z"/>
		</svg>
  `

  return `
  <location-snippet>
    ${location}
    <title>${data.name}</title>
  </location-snippet>
  `
};
