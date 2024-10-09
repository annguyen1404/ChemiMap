# API Endpoint Documentation: 

## Get Article details by Article ID (MongoDB)

### Overview
The `GET` `/api/papers/{article_id}` endpoint allows users to retrieve a specific article's details from the chemi_map `MongoDB` collection using its unique `article_id`.

It returns a JSON object with information such as the article's title, abstract, associated chemicals, diseases, and other relevant metadata.

### Request URL
`http://<your-ec2-public-ip>:5000/api/papers/{article_id}`

*development <your-ec2-public-ip>: 35.89.243.42

#### Example
Use a curl command:

`curl http://35.89.243.42:5000/api/papers/439781`

## Parameters
- `article_id` (string, required): The unique identifier of the article to be fetched.


## Response Format
The response is returned as a JSON object with the following structure:

### JSON Structure Example:
```json
{
  "article_code": "439781",
  "title": "Indomethacin induced hypotension in sodium and volume depleted rats.",
  "abstract": "After a single oral dose of 4 mg/kg indomethacin (IDM)...",
  "chemicals": ["Indomethacin", "sodium", "indomethacin", "IDM", "sodium", "sodium", "indomethacin", "indomethacin", "prostaglandin", "angiotensin", "sodium"],
  "diseases": ["hypotension"],
  "chemical_start_indices": ["0", "36", "105", "119", "127", "256", "280", "389", "419", "518", "540"],
  "chemical_end_indices": ["12", "42", "117", "122", "133", "262", "292", "401", "432", "529", "546"],
  "disease_start_indices": ["21"],
  "disease_end_indices": ["32"],
  "chemical_ids": ["D007213", "D012964", "D007213", "D007213", "D012964", "D012964", "D007213", "D007213", "D011453", "D000809", "D012964"],
  "disease_ids": ["D007022"],
  "CID_chemical": ["D007213"],
  "CID_disease": ["D007022"]
}

