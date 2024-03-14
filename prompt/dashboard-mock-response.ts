interface DataResponse {
  [index: string]: string | number;
}

interface DatasetResponse {
  name: string;
  data: DataResponse[];
}

interface FullDataResponse {
  dataPoints: DataResponse;
  dataSets: DatasetResponse[];
}

interface ElementGroup {
  name: string;
  label: string;
  type: ElementType;
  position: ElementPosition;
  elements: Element[];
}

type ElementType = 'DATA_POINT' | 'DATA_SET';

interface Element {
  name: string;
  type: ElementType;
  displayName?: string;
  width: number;
  fields?: DatasetFields[];
}

interface DatasetFields {
  name: string;
}

interface FieldDefinitions {
  [index: string]: FieldDefinition;
}

type Format = 'datetime' | 'currency' | 'percent' | 'number' | 'none';
type Type = 'string' | 'double' | 'datetime';

interface FieldDefinition {
  label: string;
  format: Format;
  type: Type;
  digitsInfo?: string;
  aggFn: 'none' | 'sum' | 'average';
}

interface LayoutResponse {
  displayName: string;
  fieldDefinitions: FieldDefinitions;
  layout: ElementGroup[];
}

const newLayoutResponse: LayoutResponse = {
  displayName: 'Marketing Analytics Dashboard',
  fieldDefinitions: {
    channel: {
      label: 'Channel',
      format: 'none',
      type: 'string',
      aggFn: 'none'
    },
    tactic: {
      label: 'Tactic',
      format: 'none',
      type: 'string',
      aggFn: 'none'
    },
    segment: {
      label: 'Segment',
      format: 'none',
      type: 'string',
      aggFn: 'none'
    },
    baselineSales: {
      label: 'Baseline Sales',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    percInc: {
      label: '% Incrementality',
      format: 'percent',
      type: 'double',
      digitsInfo: '1.0-2',
      aggFn: 'none'
    },
    percSalesI: {
      label: '% Sales (i)',
      format: 'percent',
      type: 'double',
      digitsInfo: '1.0-2',
      aggFn: 'none'
    },
    salesI: {
      label: 'Sales (i)',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    ordersI: {
      label: 'Orders (i)',
      format: 'number',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    netProfitIPerDollar: {
      label: 'Net Profit (i)/$',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-2',
      aggFn: 'average'
    },
    totalSales: {
      label: 'Total Sales',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    totalOrders: {
      label: 'Total Orders',
      format: 'number',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    mediaSpend: {
      label: 'Media Spend',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    ordersLT: {
      label: 'Orders (LT)',
      format: 'number',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    totalSpend: {
      label: 'Total Spend',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    spend: {
      label: 'Spend',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    salesLT: {
      label: 'Sales (LT)',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-0',
      aggFn: 'sum'
    },
    cpoLT: {
      label: 'CPO (LT)',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-2',
      aggFn: 'average'
    },
    cpoI: {
      label: 'CPO (I)',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-2',
      aggFn: 'average'
    },
    aov: {
      label: 'AOV',
      format: 'currency',
      type: 'double',
      digitsInfo: '1.0-2',
      aggFn: 'average'
    },
    percOrdersI: {
      label: '% Orders (i)',
      format: 'number',
      type: 'double',
      digitsInfo: '1.0-2',
      aggFn: 'average'
    },
    date: {
      label: 'Date',
      format: 'datetime',
      type: 'datetime',
      aggFn: 'none'
    }
  },
  layout: [
    {
      name: 'overallMetrics',
      type: 'DATA_POINT',
      label: 'Overall Metrics',
      width: 12,
      elements: [
        {
          name: 'mediaSpend',
          type: 'DATA_POINT',
          width: 2
        },
        {
          name: 'percSalesI',
          type: 'DATA_POINT',
          width: 2
        },
        {
          name: 'salesI',
          type: 'DATA_POINT',
          width: 4
        },
        {
          name: 'cpoI',
          type: 'DATA_POINT',
          width: 2
        },
        {
          name: 'netProfitIPerDollar',
          type: 'DATA_POINT',
          width: 2
        }
      ]
    },
    {
      name: 'observedMetrics',
      label: 'Observed Metrics',
      type: 'DATA_POINT',
      width: 8,
      elements: [
        {
          name: 'totalOrders',
          type: 'DATA_POINT',
          width: 4
        },
        {
          name: 'baselineSales',
          type: 'DATA_POINT',
          width: 4
        },
        {
          name: 'totalSales',
          type: 'DATA_POINT',
          width: 4
        }
      ]
    },
    {
      name: 'sourceMetrics',
      label: 'Source Metrics',
      type: 'DATA_POINT',
      width: 4,
      elements: [
        {
          name: 'salesLT',
          type: 'DATA_POINT',
          width: 6
        },
        {
          name: 'cpoLT',
          type: 'DATA_POINT',
          width: 6
        }
      ]
    },
    {
      name: 'summary',
      label: 'Summary',
      type: 'DATA_SET',
      width: 12
      elements: [
        {
          name: 'summary',
          displayName: 'Summary',
          type: 'DATA_SET',
          width: 12
          fields: [
            { name: 'channel' },
            { name: 'segment' },
            { name: 'tactic' },
            { name: 'totalSpend' },
            { name: 'mediaSpend' },
            { name: 'percInc' },
            { name: 'salesLT' },
            { name: 'salesI' },
            { name: 'percSalesI' },
            { name: 'ordersLT' },
            { name: 'ordersI' },
            { name: 'percOrdersI' }
          ]
        }
      ]
    }
  ]
};

const backendDataResponse: FullDataResponse = {
  dataPoints: {
    baselineSales: 2195074.5655774996,
    percSalesI: 0.6756313075622103,
    salesI: 4572146.244422501,
    netProfitIPerDollar: 2.2288898023280788,
    totalSales: 6767220.8100000005,
    totalOrders: 49215,
    mediaSpend: 701158.457337,
    salesLT: 11944657.4336,
    cpoLT: 10.790020760909858,
    cpoI: 25.131341014127408
  },
  dataSets: [
    {
      name: 'summary',
      data: [
        {
          channel: 'Affiliate',
          segment: 'Prospects',
          tactic: 'Impact',
          totalSpend: 7625.071235364659,
          mediaSpend: 3459.29,
          percInc: 0.0767,
          salesLT: 208103.66499999998,
          salesI: 15961.5511055,
          cpoLT: 3.698470058695861,
          cpoI: 48.219948614026876,
          ordersLT: 935.33,
          ordersI: 71.739811,
          percSalesI: 0.002358656759346973,
          percOrdersI: 0.0014576818246469572
        },
        {
          channel: 'Catalog',
          segment: 'Customers',
          tactic: 'Catalog-Buyer',
          totalSpend: 272521.25000000006,
          mediaSpend: 226021.25000000003,
          percInc: 0.6,
          salesLT: 3822592,
          salesI: 2293555.2,
          cpoLT: 8.54038352541092,
          cpoI: 14.233972542351536,
          ordersLT: 26465,
          ordersI: 15879,
          percSalesI: 0.3389212890187929,
          percOrdersI: 0.322645534897897
        },
        {
          channel: 'Catalog',
          segment: 'Customers',
          tactic: 'Catalog-Other',
          totalSpend: 44.2,
          mediaSpend: 44.2,
          percInc: 0.99,
          salesLT: 5449,
          salesI: 5394.51,
          cpoLT: 1.768,
          cpoI: 1.785858585858586,
          ordersLT: 25,
          ordersI: 24.75,
          percSalesI: 0.0007971529452723739,
          percOrdersI: 0.0005028954587016154
        },
        {
          channel: 'Catalog',
          segment: 'Prospects',
          tactic: 'Catalog-Postal Append',
          totalSpend: 55387.15000000001,
          mediaSpend: 55387.15000000001,
          percInc: 0.4600000000000001,
          salesLT: 443882,
          salesI: 204185.72000000003,
          cpoLT: 19.04647524071527,
          cpoI: 41.40538095807667,
          ordersLT: 2908,
          ordersI: 1337.6800000000003,
          percSalesI: 0.030172758615807604,
          percOrdersI: 0.027180331199837454
        },
        {
          channel: 'Catalog',
          segment: 'Prospects',
          tactic: 'Catalog-Prospects',
          totalSpend: 173547.40000000002,
          mediaSpend: 173547.40000000002,
          percInc: 0.66,
          salesLT: 479877,
          salesI: 316718.82,
          cpoLT: 56.51169000325628,
          cpoI: 85.62377273220648,
          ordersLT: 3071,
          ordersI: 2026.8600000000001,
          percSalesI: 0.04680190419263118,
          percOrdersI: 0.04118378543127096
        },
        {
          channel: 'Email',
          segment: 'Customers',
          tactic: 'Klaviyo',
          totalSpend: 0,
          mediaSpend: 0,
          percInc: 0.05,
          salesLT: 3797339.854,
          salesI: 189866.9927,
          cpoLT: 0,
          cpoI: 0,
          ordersLT: 16904.91,
          ordersI: 845.2455,
          percSalesI: 0.028056863819107446,
          percOrdersI: 0.017174550441938434
        },
        {
          channel: 'Facebook',
          segment: 'Customers',
          tactic: 'FB-CRM-WPromote',
          totalSpend: 22894.352230071683,
          mediaSpend: 20938.72,
          percInc: 0.32008016877637135,
          salesLT: 415780.2,
          salesI: 132423.3284,
          cpoLT: 11.043628691983123,
          cpoI: 34.50269579087517,
          ordersLT: 1896,
          ordersI: 606.8720000000001,
          percSalesI: 0.01956834749714632,
          percOrdersI: 0.012331037285380474
        },
        {
          channel: 'Facebook',
          segment: 'Customers',
          tactic: 'FB-Retargeting',
          totalSpend: 12924.156309589885,
          mediaSpend: 11818.389998,
          percInc: 0.15422065217391306,
          salesLT: 164119.12,
          salesI: 25311.385107000002,
          cpoLT: 14.273417871980676,
          cpoI: 92.55192265614784,
          ordersLT: 828,
          ordersI: 127.6947,
          percSalesI: 0.0037402924801267124,
          percOrdersI: 0.0025946296860713198
        },
        {
          channel: 'Facebook',
          segment: 'Prospects',
          tactic: 'FB-Prospecting',
          totalSpend: 133394.7706045296,
          mediaSpend: 122020.929996,
          percInc: 1.187517736808646,
          salesLT: 529105.75,
          salesI: 646796.87015,
          cpoLT: 38.78605530705658,
          cpoI: 32.66145347124738,
          ordersLT: 3146,
          ordersI: 3735.9308,
          percSalesI: 0.09557791718488345,
          percOrdersI: 0.07591040942801991
        },
        {
          channel: 'Google',
          segment: 'Customers',
          tactic: 'PPC-Brand',
          totalSpend: 26788.014198883047,
          mediaSpend: 24500.17,
          percInc: 0.16,
          salesLT: 1218784.2128,
          salesI: 193388.09856,
          cpoLT: 4.896374254027569,
          cpoI: 30.60233908767231,
          ordersLT: 5003.7372,
          ordersI: 800.597952,
          percSalesI: 0.028577181680584176,
          percOrdersI: 0.016267356537640963
        },
        {
          channel: 'Google',
          segment: 'Prospects',
          tactic: 'PLA-Non Brand',
          totalSpend: 66380.66452722238,
          mediaSpend: 60704.327343,
          percInc: 0.64,
          salesLT: 841702.4264,
          salesI: 534151.94112,
          cpoLT: 16.279343091661318,
          cpoI: 25.43647358072081,
          ordersLT: 3728.9175,
          ordersI: 2386.5072,
          percSalesI: 0.07893224650371648,
          percOrdersI: 0.04849145992075587
        },
        {
          channel: 'Google',
          segment: 'Prospects',
          tactic: 'PPC-Non Brand',
          totalSpend: 2969.1956685943187,
          mediaSpend: 2716.63,
          percInc: 0.81,
          salesLT: 17922.2054,
          salesI: 14391.827280000001,
          cpoLT: 38.68278360321466,
          cpoI: 47.75652296693167,
          ordersLT: 70.2284,
          ordersI: 56.885004,
          percSalesI: 0.0021266968647946334,
          percOrdersI: 0.0011558468759524537
        }
      ]
    }
  ]
};

export { newLayoutResponse, backendDataResponse };
