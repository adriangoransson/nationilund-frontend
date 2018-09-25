# API

Base URL `https://api.nationilund.se`

Get events for today, this week or this month.

    GET /day
    GET /week
    GET /month

Get events for a specific date, or the week/month that date occurs.  
These routes are IP limited to 30 requests/minute.

    GET /day/YYYY-MM-DD
    GET /week/YYYY-MM-DD
    GET /month/YYYY-MM-DD

### Filtering

By default, the API will filter out events not hosted by a nation.

In order to retrieve the unfiltered data from Studentlund: pass the `all` query parameter with a non-empty value.

## Response
A JSON list of event objects.

    [
        {
            id              string
            summary         string
            description     string
            url             string
            image_url       string
            location        string

            organizer {
                name          string
                email         string
            }

            date {
                start         date string (RFC3339)
                end           date string (RFC3339)
                last_updated  date string (RFC3339)
            }
        },
        {...}
    ]

### Errors

In case of errors the API response will have one of the following status codes.

| Status code | Description                       |
| ----------- | --------------------------------- |
| 400         | Date was incorrectly formatted.   |
| 429         | Rate limit exceeded.              |
| 503         | Internal fetching of data failed. |
