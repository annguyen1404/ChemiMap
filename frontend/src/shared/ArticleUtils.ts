import { Article, GraphData, Node, Link } from "../components/DataModels";

export const parseArray = (str: string | undefined): string[] => {
  try {
    const fixedStr = str?.replace(/'/g, '"');
    const parsedArray = JSON.parse(fixedStr || "[]") as string[];
    const normalizedArray = parsedArray.map((item) => item.toLowerCase());
    return [...new Set(normalizedArray)];
  } catch (error) {
    console.error("Failed to parse array:", str);
    return [];
  }
};

export const truncateAbstract = (abstract: string): string => {
  if (abstract.length > 50) {
    return abstract.substring(0, 450) + "...";
  }
  return abstract;
};

export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function formatGraphData(articles: Article[]): GraphData {
  const nodeMap = new Map<string, Node>(); // Map to track nodes with at least one link
  const linkMap = new Map<string, Link>(); // Map to track unique links

  articles.forEach((article) => {
    const {
      CID_chemical = [],
      CID_disease = [],
      chemicals = [],
      diseases = [],
      chemical_ids = [],
      disease_ids = [],
    } = article;

    // Create links and ensure nodes in CID lists are added
    CID_chemical.forEach((chemID, i) => {
      const disID = CID_disease[i];
      const linkKey = `${chemID}-${disID}`;

      // Add chemical node or update its weight
      if (!nodeMap.has(chemID)) {
        const chemicalIndex = chemical_ids.indexOf(chemID);
        const chemicalName =
          chemicalIndex >= 0 ? chemicals[chemicalIndex] : chemID;
        nodeMap.set(chemID, {
          id: chemID,
          group: 1,
          label: chemicalName,
          weight: 1,
        });
      } else {
        nodeMap.get(chemID)!.weight = (nodeMap.get(chemID)!.weight || 0) + 1;
      }

      // Add disease node or update its weight
      if (!nodeMap.has(disID)) {
        const diseaseIndex = disease_ids.indexOf(disID);
        const diseaseName = diseaseIndex >= 0 ? diseases[diseaseIndex] : disID;
        nodeMap.set(disID, {
          id: disID,
          group: 2,
          label: diseaseName,
          weight: 1,
        });
      } else {
        nodeMap.get(disID)!.weight = (nodeMap.get(disID)!.weight || 0) + 1;
      }

      // Add or update the link
      if (!linkMap.has(linkKey)) {
        linkMap.set(linkKey, {
          source: nodeMap.get(chemID)!,
          target: nodeMap.get(disID)!,
          weight: 1,
        });
      } else {
        // Increment weight if the link already exists
        const link = linkMap.get(linkKey)!;
        link.weight = (link.weight || 1) + 1;
      }
    });
  });

  // Convert nodeMap and linkMap to arrays
  const nodes = Array.from(nodeMap.values());
  const links = Array.from(linkMap.values());

  return { nodes, links };
}

export const cleanArticle = (
  data: any,
  shortAbstract: boolean,
  updateGraphData: boolean
): Article[] => {
  if (updateGraphData) {
    return data.map((article: any) => {
      return {
        id: article.article_code,
        title: article.title,
        abstract: shortAbstract? truncateAbstract(article.abstract): article.abstract,
        chemicals: parseArray(article.chemicals),
        diseases: parseArray(article.diseases),
        chemical_ids: parseArray(article.chemical_ids),
        disease_ids: parseArray(article.disease_ids),
        CID_chemical: parseArray(article.CID_chemical),
        CID_disease: parseArray(article.CID_disease),
      };
    });
  }
  return data.map((article: any) => {
    return {
      id: article.article_code,
      title: article.title,
      abstract: shortAbstract? truncateAbstract(article.abstract): article.abstract,
    };
  });
};
