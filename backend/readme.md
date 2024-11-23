# ChemiMap Backend API

This is a backend Flask API for the ChemiMap application. It connects to a MongoDB and an Elasticsearch service to serve articles related to chemical-disease interactions. The API provides several endpoints to interact with the data and perform searches.

## Prerequisites
- MongoDB running on `localhost:27017`
- Elasticsearch running on `localhost:9200`
- Python environment with required libraries (`flask`, `pymongo`, `elasticsearch`)

## Dependencies
- `flask`
- `pymongo`
- `elasticsearch`

## Running the Application
1. Ensure MongoDB and Elasticsearch are running locally.
2. Activate the virtual environment and run the Flask app:
   ```bash
   source venv/bin/activate
   python3 chemimap.py
   ```

## Endpoints

*for development using ec2-public-ip = http://35.89.243.42/

### 1. Health Check
- **URL**: `/`
- **Method**: `GET`
- **Description**: Basic health check endpoint to ensure the server is running.
- **Response Example**:
   "ChemiMap Backend Running"


### 2. Get Full Article by ID (MongoDB)
- **URL**: `/api/papers/<article_id>`
- **Method**: `GET`
- **Description**: Retrieves the full article details from MongoDB using the `article_id`.
- **Parameters**:
  - `article_id` (string): The unique identifier of the article.

- **Example**:
  
  Command:

  `curl http://35.89.243.42:5000/api/papers/439781`

  Response:


  ```json
  {
    "CID_chemical":"['D007213']",
    "CID_disease":"['D007022']",
    "_id":"67070211988455047ba6212b",
    "abstract":"After a single oral dose of 4 mg/kg indomethacin (IDM) to sodium and volume depleted rats plasma renin activity (PRA) and systolic blood pressure fell significantly within four hours. In sodium repleted animals indomethacin did not change systolic blood pressure (BP) although plasma renin activity was decreased. Thus, indomethacin by inhibition of prostaglandin synthesis may diminish the blood pressure maintaining effect of the stimulated renin-angiotensin system in sodium and volume depletion.",
    "article_code":"439781",
    "chemical_end_indices":"['12', '42', '117', '122', '133', '262', '292', '401', '432', '529', '546']",
    "chemical_ids":"['D007213', 'D012964', 'D007213', 'D007213', 'D012964', 'D012964', 'D007213', 'D007213', 'D011453', 'D000809', 'D012964']",
    "chemical_start_indices":"['0', '36', '105', '119', '127', '256', '280', '389', '419', '518', '540']",
    "chemicals":"['Indomethacin', 'sodium', 'indomethacin', 'IDM', 'sodium', 'sodium', 'indomethacin', 'indomethacin', 'prostaglandin', 'angiotensin', 'sodium']","disease_end_indices":"['32']",
    "disease_ids":"['D007022']",
    "disease_start_indices":"['21']",
    "diseases":"['hypotension']",
    "title":"Indomethacin induced hypotension in sodium and volume depleted rats."
    }



### 3. Search Articles (Elasticsearch)
- **URL**: `/api/search/`
- **Method**: `GET`
- **Description**: Search articles based on a query term using Elasticsearch.
- **Parameters**:
  - `query` (string): The search query.
  - `limit` (integer): Maximum number of results to return. Default is 10.
  - `skip` (integer): Number of results to skip for pagination. Default is 0.
- **Example**:
  
  Command:

  `curl "http://35.89.243.42:5000/api/search/?query=cancer&limit=3&skip=1"`

  Response:


  ```json
  
  [
    {
    "CID_chemical":"['D003976']",
    "CID_disease":"['D008175']",
    "abstract":"OBJECTIVE: Diazinon, a common organophosphate insecticide with genotoxic properties, was previously associated with lung cancer in the Agricultural Health Study (AHS) cohort, but few other epidemiological studies have examined diazinon-associated cancer risk. We used updated diazinon exposure and cancer incidence information to evaluate solid tumour risk in the AHS. METHODS: Male pesticide applicators in Iowa and North Carolina reported lifetime diazinon use at enrolment (1993-1997) and follow-up (1998-2005); cancer incidence was assessed through 2010(North Carolina)/2011(Iowa). Among applicators with usage information sufficient to evaluate exposure-response patterns, we used Poisson regression to estimate adjusted rate ratios (RRs) and 95% CI for cancer sites with >10 exposed cases for both lifetime (LT) exposure days and intensity-weighted (IW) lifetime exposure days (accounting for factors impacting exposure). RESULTS: We observed elevated lung cancer risks (N=283) among applicators with the greatest number of LT (RR=1.60; 95% CI 1.11 to 2.31; Ptrend=0.02) and IW days of diazinon use (RR=1.41; 95% CI 0.98 to 2.04; Ptrend=0.08). Kidney cancer (N=94) risks were non-significantly elevated (RRLT days=1.77; 95% CI 0.90 to 3.51; Ptrend=0.09; RRIW days 1.37; 95% CI 0.64 to 2.92; Ptrend=0.50), as were risks for aggressive prostate cancer (N=656). CONCLUSIONS: Our updated evaluation of diazinon provides additional evidence of an association with lung cancer risk. Newly identified links to kidney cancer and associations with aggressive prostate cancer require further evaluation.",
    "article_code":"25907210",
    "chemical_end_indices":"['85', '106', '181', '207', '397', '446', '620', '1262', '1574']",
    "chemical_ids":"['D010755', 'D003976', 'D003976', 'D010755', 'D003976', 'D003976', 'D003976', 'D003976', 'D003976']",
    "chemical_start_indices":"['70', '98', '173', '192', '389', '438', '612', '1254', '1566']",
    "chemicals":"['organophosphate', 'diazinon', 'Diazinon', 'organophosphate', 'diazinon', 'diazinon', 'diazinon', 'diazinon', 'diazinon']",
    "disease_end_indices":"['26', '289', '415', '466', '513', '683', '927', '1131', '1325', '1517', '1638', '1684', '1733']",
    "disease_ids":"['D009369', 'D008175', 'D009369', 'D009369', 'D009369', 'D009369', 'D009369', 'D008175', 'D007680', 'D011471', 'D008175', 'D007680', 'D011471']","disease_start_indices":"['19', '278', '409', '460', '507', '677', '921', '1120', '1312', '1502', '1627', '1671', '1718']",
    "diseases":"['tumours', 'lung cancer', 'cancer', 'cancer', 'tumour', 'cancer', 'cancer', 'lung cancer', 'Kidney cancer', 'prostate cancer', 'lung cancer', 'kidney cancer', 'prostate cancer']",
    "title":"Incidence of solid tumours among pesticide applicators exposed to the organophosphate insecticide diazinon in the Agricultural Health Study: an updated analysis."
    },
    {
    "CID_chemical":"['D003520']",
    "CID_disease":"['D001749']",
    "abstract":"OBJECTIVE: To assess and characterise the risk of bladder cancer, and its relation to cyclophosphamide, in patients with Wegener's granulomatosis. METHODS: In the population based, nationwide Swedish Inpatient Register a cohort of 1065 patients with Wegener's granulomatosis, 1969-95, was identified. Through linkage with the Swedish Cancer Register, all subjects in this cohort diagnosed with bladder cancer were identified. Nested within the cohort, a matched case-control study was performed to estimate the association between cyclophosphamide and bladder cancer using odds ratios (ORs) as relative risk. In the cohort the cumulative risk of bladder cancer after Wegener's granulomatosis, and the relative prevalence of a history of bladder cancer at the time of diagnosis of Wegener's granulomatosis, were also estimated. RESULTS: The median cumulative doses of cyclophosphamide among cases (n = 11) and controls (n = 25) were 113 g and 25 g, respectively. The risk of bladder cancer doubled for every 10 g increment in cyclophosphamide (OR = 2.0, 95% confidence interval (CI) 0.8 to 4.9). Treatment duration longer than 1 year was associated with an eightfold increased risk (OR = 7.7, 95% CI 0.9 to 69). The absolute risk for bladder cancer in the cohort reached 10% 16 years after diagnosis of Wegener's granulomatosis, and a history of bladder cancer was (non-significantly) twice as common as expected at the time of diagnosis of Wegener's granulomatosis. CONCLUSION: The results indicate a dose-response relationship between cyclophosphamide and the risk of bladder cancer, high cumulative risks in the entire cohort, and also the possibility of risk factors operating even before Wegener's granulomatosis.","article_code":"15130900",
    "chemical_end_indices":"['90', '194', '639', '975', '1133', '1644']",
    "chemical_ids":"['D003520', 'D003520', 'D003520', 'D003520', 'D003520', 'D003520']",
    "chemical_start_indices":"['74', '178', '623', '959', '1117', '1628']",
    "chemicals":"['cyclophosphamide', 'cyclophosphamide', 'cyclophosphamide', 'cyclophosphamide', 'cyclophosphamide', 'cyclophosphamide']",
    "disease_end_indices":"['22', '50', '156', '237', '366', '432', '500', '658', '752', '783', '843', '896', '1080', '1339', '1418', '1451', '1556', '1675', '1808']","disease_ids":"['D001749', 'D014890', 'D001749', 'D014890', 'D014890', 'D009369', 'D001749', 'D001749', 'D001749', 'D014890', 'D001749', 'D014890', 'D001749', 'D001749', 'D014890', 'D001749', 'D014890', 'D001749', 'D014890']",
    "disease_start_indices":"['0', '26', '142', '213', '342', '426', '486', '644', '738', '759', '829', '872', '1066', '1325', '1394', '1437', '1532', '1661', '1784']",
    "diseases":"['Urinary bladder cancer', \"Wegener's granulomatosis\", 'bladder cancer', \"Wegener's granulomatosis\", \"Wegener's granulomatosis\", 'Cancer', 'bladder cancer', 'bladder cancer', 'bladder cancer', \"Wegener's granulomatosis\", 'bladder cancer', \"Wegener's granulomatosis\", 'bladder cancer', 'bladder cancer', \"Wegener's granulomatosis\", 'bladder cancer', \"Wegener's granulomatosis\", 'bladder cancer', \"Wegener's granulomatosis\"]",
    "title":"Urinary bladder cancer in Wegener's granulomatosis: risks and relation to cyclophosphamide."}
    ,
    {
    "CID_chemical":"['D001152']",
    "CID_disease":"['D009369']",
    "abstract":"BACKGROUND: Millions of individuals worldwide, particularly those living in rural and developing areas, are exposed to harmful levels of inorganic arsenic (iAs) in their drinking water. Inorganic As exposure during key developmental periods is associated with a variety of adverse health effects including those that are evident in adulthood. There is considerable interest in identifying the molecular mechanisms that relate early-life iAs exposure to the development of these latent diseases, particularly in relationship to cancer. OBJECTIVES: This work summarizes research on the molecular mechanisms that underlie the increased risk of cancer development in adulthood that is associated with early-life iAs exposure. DISCUSSION: Epigenetic reprogramming that imparts functional changes in gene expression, the development of cancer stem cells, and immunomodulation are plausible underlying mechanisms by which early-life iAs exposure elicits latent carcinogenic effects. CONCLUSIONS: Evidence is mounting that relates early-life iAs exposure and cancer development later in life. Future research should include animal studies that address mechanistic hypotheses and studies of human populations that integrate early-life exposure, molecular alterations, and latent disease outcomes.",
    "article_code":"26115410",
    "chemical_end_indices":"['76', '286', '291', '330', '572', '843', '1061', '1169']",
    "chemical_ids":"['D001151', 'D001152', 'D001152', 'D001152', 'D001152', 'D001152', 'D001152', 'D001152']",
    "chemical_start_indices":"['69', '269', '288', '318', '569', '840', '1058', '1166']",
    "chemicals":"['Arsenic', 'inorganic arsenic', 'iAs', 'Inorganic As', 'iAs', 'iAs', 'iAs', 'iAs']",
    "disease_end_indices":"['665', '779', '968', '1189']",
    "disease_ids":"['D009369', 'D009369', 'D009369', 'D009369']",
    "disease_start_indices":"['659', '773', '962', '1183']",
    "diseases":"['cancer', 'cancer', 'cancer', 'cancer']",
    "title":"Mechanisms Underlying Latent Disease Risk Associated with Early-Life Arsenic Exposure: Current Research Trends and Scientific Gaps."
    }
    ]