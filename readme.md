# API Documentation

This document provides an overview of the available endpoints and their usage in the API.

## Base URL

The base URL for all requests is `https://localhost:8082`.

## Endpoints

### `GET /trips`

Retrieves a list of all trips by categories (comma separated).
NOTE: Whitespace is not allowed; replace with `%20`.

#### **Request:**

```
GET /trips?categories=cafe,live%20music
```

#### **Response:**

```json
[
  {
    "metadata": {
      "city": "Grimsby",
      "country": "Canada",
      "travel_methods": ["Uber"],
      "party_sizes": {
        "min": 2,
        "max": 4
      },
      "budget_dollars": 100,
      "tags": ["Beach"],
      "weather": ["Sunny", "Clear"],
      "temperature": "Hot",
      "time_of_day": ["Afternoon"],
      "season": "Summer"
    },
    "_id": "649241ce81710af654d9e657",
    "name": "Beach Day",
    "duration": {
      "start": "2023-07-20T01:03:08.814Z",
      "end": "2023-07-20T01:03:08.814Z",
      "formatted_duration": "15 mins"
    },
    "itinerary": [
      {
        "date": "2023-07-20T00:00:00.000Z",
        "activities": [
          {
            "type": "Travel",
            "notes": "Get Uber-X",
            "duration": {
              "start": "2023-07-20T05:03:08.814Z",
              "end": "2023-07-20T05:03:08.814Z",
              "formatted_duration": "15 mins"
            },
            "party_size": 3,
            "cost_dollar": 25,
            "travel_method": "Uber",
            "path": {
              "distance_km": 25,
              "origin": {
                "lat": 1230.123,
                "lng": 123.123,
                "_id": "649241ce81710af654d9e654"
              },
              "destination": {
                "lat": 1230.123,
                "lng": 123.123,
                "_id": "649241ce81710af654d9e655"
              }
            },
            "_id": "649241ce81710af654d9e653"
          }
        ],
        "_id": "649241ce81710af654d9e658"
      },
      {
        "date": "2023-07-21T00:00:00.000Z",
        "activities": [
          {
            "type": "Place",
            "notes": "Sarah will meet us there",
            "duration": {
              "start": "2023-07-20T01:03:08.814Z",
              "end": "2023-07-20T01:03:08.814Z",
              "formatted_duration": "15 mins"
            },
            "party_size": 3,
            "cost_dollar": 25,
            "place_type": "Beach",
            "place_id": "123abc",
            "_id": "649241ce81710af654d9e656"
          }
        ],
        "_id": "649241ce81710af654d9e659"
      }
    ],
    "__v": 0
  }
]
```

### `POST /trips`

Creates as single trip.

#### **Request:**

```
POST /trips
```

Body:

```json
{
  "name": "Beach Day",
  "duration": {
    "start": "2023-07-20T01:03:08.814+00:00",
    "end": "2023-07-20T01:03:08.814+00:00"
  },
  "metadata": {
    "city": "Grimsby",
    "country": "Canada",
    "travel_methods": ["Uber"],
    "party_sizes": {
      "min": 2,
      "max": 4
    },
    "budget_dollars": 100,
    "tags": ["Beach"],
    "indoors_or_outdoors": "Outdoors",
    "weather": ["Sunny", "Clear"],
    "temperature": "Hot",
    "time_of_day": ["Afternoon"],
    "season": "Summer"
  },
  "itinerary": {
    "2023-07-20": [
      {
        "type": "Travel",
        "travel_method": "Uber",
        "duration": {
          "start": "2023-07-20T01:03:08.814",
          "end": "2023-07-20T01:03:08.814"
        },
        "cost_dollar": 25,
        "path": {
          "distance_km": 25,
          "origin": {
            "lat": 1230.123,
            "lng": 123.123
          },
          "destination": {
            "lat": 1230.123,
            "lng": 123.123
          }
        },
        "party_size": 3,
        "notes": "Get Uber-X"
      }
    ],
    "2023-07-21": [
      {
        "type": "Point",
        "place_id": "123abc",
        "place_type": "Beach",
        "duration": {
          "start": "2023-07-20T01:03:08.814+00:00",
          "end": "2023-07-20T01:03:08.814+00:00"
        },
        "cost_dollar": 25,
        "party_size": 3,
        "notes": "Sarah will meet us there"
      }
    ]
  }
}
```

#### **Response:**

```json
{
  "name": "Beach Day",
  "duration": {
    "start": "2023-07-20T01:03:08.814Z",
    "end": "2023-07-20T01:03:08.814Z",
    "formatted_duration": "15 mins"
  },
  "metadata": {
    "city": "Grimsby",
    "travel_methods": ["Uber"],
    "party_sizes": {
      "min": 2,
      "max": 4
    },
    "budget_dollars": 100,
    "tags": ["Beach"],
    "weather": ["Sunny", "Clear"],
    "temperature": "Hot",
    "time_of_day": ["Afternoon"],
    "season": "Summer"
  },
  "itinerary": [
    {
      "date": "2023-07-20T00:00:00.000Z",
      "activities": [
        {
          "type": "Travel",
          "notes": "Get Uber-X",
          "duration": {
            "start": "2023-07-20T05:03:08.814Z",
            "end": "2023-07-20T05:03:08.814Z",
            "formatted_duration": "15 mins"
          },
          "party_size": 3,
          "cost_dollar": 25,
          "travel_method": "Uber",
          "path": {
            "distance_km": 25,
            "origin": {
              "lat": 1230.123,
              "lng": 123.123,
              "_id": "64934804923131c1fc3b05c1"
            },
            "destination": {
              "lat": 1230.123,
              "lng": 123.123,
              "_id": "64934804923131c1fc3b05c2"
            }
          },
          "_id": "64934804923131c1fc3b05c0"
        }
      ],
      "_id": "64934804923131c1fc3b05c5"
    },
    {
      "date": "2023-07-21T00:00:00.000Z",
      "activities": [
        {
          "type": "Place",
          "notes": "Sarah will meet us there",
          "duration": {
            "start": "2023-07-20T01:03:08.814Z",
            "end": "2023-07-20T01:03:08.814Z",
            "formatted_duration": "15 mins"
          },
          "party_size": 3,
          "cost_dollar": 25,
          "place_type": "Beach",
          "place_id": "123abc",
          "_id": "64934804923131c1fc3b05c3"
        }
      ],
      "_id": "64934804923131c1fc3b05c6"
    }
  ],
  "_id": "64934804923131c1fc3b05c4",
  "__v": 0
}
```

### `GET /places`

Returns a list of all places.

#### **Request:**

```
GET /places?type=Cafe&city=Grimsby
```

Params:

- `type`: {enum} - A single type of place.
- `city`: {string} - The name of a city.

#### **Response:**

### `GET /places/{id}`

Returns a single place.

#### **Request:**

```json
GET /places/123
```

#### **Response:**

```json
{
  "properties": {
    "viewport": {
      "northeast": {
        "lat": "43.1380625802915",
        "lng": "-80.26450931970851"
      },
      "southwest": {
        "lat": "43.1353646197085",
        "lng": "-80.26720728029152"
      }
    },
    "icon": {
      "url": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      "background_color": "#7B9EB0",
      "mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet"
    },
    "plus_code": {
      "compound_code": "4PPM+JM Brantford, ON, Canada",
      "global_code": "86MX4PPM+JM"
    },
    "opening_hours": {
      "weekday_text": [],
      "periods": []
    },
    "business_status": "OPERATIONAL",
    "formatted_address": "40 Icomm Dr, Brantford, ON N3S 7S9, Canada",
    "name": "Casino Win in CA",
    "place_id": "ChIJ66KwX2JnLIgR9_Y0antD_ks",
    "rating": 5,
    "reference": "ChIJ66KwX2JnLIgR9_Y0antD_ks",
    "types": ["casino"],
    "website": "https://casinowin.ca/",
    "user_ratings_total": 1,
    "vicinity": "Grimsby",
    "photos": []
  },
  "_id": "64927125eb085fa113bc70c7",
  "type": "Point",
  "coordinates": [-80.2658459, 43.1365589],
  "expiry_time": "2023-07-21T03:40:21.122Z",
  "__v": 0
}
```

### `POST /places`

Creates a single place.

#### **Request:**

```
POST /places
```

#### **Response:**

```json
{
  "updated": true,
  "matches": [
    {
      "properties": {
        "business_status": "OPERATIONAL",
        "formatted_address": "41 King William St, Hamilton, ON L8R 1A2, Canada",
        "viewport": {
          "northeast": {
            "lat": "43.2586187802915",
            "lng": "-79.8659427697085"
          },
          "southwest": {
            "lat": "43.2559208197085",
            "lng": "-79.8686407302915"
          }
        },
        "icon": {
          "url": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "background_color": "#FF9E67",
          "mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet"
        },
        "plus_code": {
          "compound_code": "744M+W4 Hamilton, ON, Canada",
          "global_code": "87M2744M+W4"
        },
        "name": "The Mule Hamilton",
        "opening_hours": {
          "periods": [
            {
              "close": {
                "day": 1,
                "time": "0200"
              },
              "open": {
                "day": 0,
                "time": "1100"
              },
              "_id": "6490fb1872a67e8a078ec706"
            }
          ],
          "weekday_text": [
            "Monday: 11:30\u202fAM – 2:00\u202fAM",
            "Tuesday: 11:30\u202fAM – 2:00\u202fAM",
            "Wednesday: 11:30\u202fAM – 2:00\u202fAM",
            "Thursday: 11:30\u202fAM – 2:00\u202fAM",
            "Friday: 11:30\u202fAM – 2:00\u202fAM",
            "Saturday: 11:00\u202fAM – 2:00\u202fAM",
            "Sunday: 11:00\u202fAM – 2:00\u202fAM"
          ]
        },
        "photos": [
          {
            "height": 3456,
            "html_attributions": [
              "<a href=\"https://maps.google.com/maps/contrib/113558380994240492551\">The Mule Hamilton</a>"
            ],
            "photo_reference": "AZose0kjUG9tw24_hAKwxEV8CeIOYdcK23qN646WiWaDTm0P-926ShnbNJrhfZ5GX-X06WdWpp2NgZ52qj9uhS_IEg295ziwvFR7jf3e706WdEtz4XWJMApMbtaGipCEb-urYG1eqYaU4tvAIebjV3ZkWdgP2pH3eB4Wxgbos2DCj3CWG64z",
            "width": 5184,
            "_id": "6490fb1872a67e8a078ec70d"
          }
        ],
        "delivery": true,
        "dine_in": true,
        "price_level": 2,
        "reservable": true,
        "place_id": "ChIJU9XI9YSbLIgR5AN0zdjXX-Y",
        "rating": 4.5,
        "reference": "ChIJU9XI9YSbLIgR5AN0zdjXX-Y",
        "types": ["bar"],
        "website": "http://themule.ca/",
        "user_ratings_total": 3287,
        "vicinity": "Hamilton",
        "wheelchair_accessible_entrance": true
      },
      "_id": "6490fb1872a67e8a078ec705",
      "type": "Point",
      "coordinates": [-79.8672486, 43.2572631],
      "expiry_time": "2023-07-20T01:04:24.599Z",
      "__v": 0
    }
  ]
}
```

### `GET /categories`

Retrieves a list of all categories.

#### **Request:**

```
GET /categories
```

#### **Response:**

```json
[
  "beach",
  "night club",
  "biking",
  "attractions",
  "basketball",
  "museum",
  "Swimming",
  "live music",
  "restaurant",
  "cafe",
  "tennis",
  "baseball",
  "cricket",
  "football",
  "golf",
  "hockey",
  "volleyball",
  "sailing",
  "bar"
]
```

### `POST /categories`

Creates a list of categories.

#### **Request:**

```
GET /categories
```

Body:

```json
[{ "label": "beach" }, { "label": "night club" }]
```

#### **Response:**

```json
[
  "beach",
  "night club",
  "biking",
  "attractions",
  "basketball",
  "museum",
  "Swimming",
  "live music",
  "restaurant",
  "cafe",
  "tennis",
  "baseball",
  "cricket",
  "football",
  "golf",
  "hockey",
  "volleyball",
  "sailing",
  "bar"
]
```
