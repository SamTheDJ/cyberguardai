export type Vulnerability = {
  id: string;
  filePath: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  codeSnippet: string;
  status: "Pending" | "Patched" | "Generating Patch";
};

export type Communication = {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  content: string;
  status: "Pending" | "Analyzed" | "Quarantined";
  threatLevel: "High" | "Medium" | "Low" | "None";
};

export type NetworkLog = {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  protocol: "TCP" | "UDP" | "ICMP";
  details: string;
};

export const vulnerabilities: Vulnerability[] = [
  {
    id: "vuln-001",
    filePath: "/server/auth/jwt-handler.js",
    description: "SQL Injection vulnerability in user authentication query.",
    severity: "Critical",
    codeSnippet: `const user = await db.query(\`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`);`,
    status: "Pending",
  },
  {
    id: "vuln-002",
    filePath: "/api/v1/image-upload.php",
    description: "Unrestricted File Upload allowing potential remote code execution.",
    severity: "High",
    codeSnippet: `move_uploaded_file($_FILES['userFile']['tmp_name'], 'uploads/' . $_FILES['userFile']['name']);`,
    status: "Pending",
  },
  {
    id: "vuln-003",
    filePath: "/lib/utils/helpers.py",
    description: "Use of hard-coded credentials for database connection.",
    severity: "High",
    codeSnippet: `DB_USER = "admin"\nDB_PASS = "admin123"\nconn = connect(user=DB_USER, pass=DB_PASS)`,
    status: "Patched",
  },
];

export const communications: Communication[] = [
  {
    id: "comm-001",
    sender: "security-alert@yourbank.com",
    subject: "Urgent: Suspicious Activity on Your Account",
    snippet: "We've detected unusual sign-in attempts. Please verify your identity immediately...",
    content: "Dear Customer,\n\nWe have detected suspicious activity on your account from an unrecognized device. For your security, we have temporarily locked your account.\n\nPlease click the link below to verify your identity and restore access:\nhttp://yourbank-security-verification.com/login\n\nThank you,\nYour Bank Security Team",
    status: "Pending",
    threatLevel: "High",
  },
  {
    id: "comm-002",
    sender: "it-support@corp-email.net",
    subject: "Action Required: Mandatory Password Update",
    snippet: "Your corporate password is set to expire. You must update it within 24 hours...",
    content: "All Employees,\n\nAs part of our new security policy, all passwords must be updated. Please follow the link to our secure portal to update your credentials immediately.\nFailure to do so will result in suspension of your account.\n\nLink: [https://corp-portal-update.web.app]\n\nRegards,\nIT Department",
    status: "Pending",
    threatLevel: "High",
  },
  {
    id: "comm-003",
    sender: "newsletter@marketing-weekly.com",
    subject: "Your Weekly Marketing Insights",
    snippet: "Discover the latest trends in digital marketing and boost your campaigns.",
    content: "Hi there,\n\nHere is your weekly dose of marketing insights. This week, we cover AI in content creation, the rise of short-form video, and more.\n\nEnjoy!\nThe Marketing Weekly Team",
    status: "Analyzed",
    threatLevel: "None",
  },
];

export const networkTrafficData: NetworkLog[] = [
  { id: "net-001", timestamp: "14:32:11", sourceIp: "192.168.1.102", destinationIp: "104.16.24.35", protocol: "TCP", details: "Standard HTTPS traffic" },
  { id: "net-002", timestamp: "14:32:15", sourceIp: "10.0.5.23", destinationIp: "192.168.1.255", protocol: "UDP", details: "Broadcast to local network" },
  { id: "net-003", timestamp: "14:32:18", sourceIp: "203.0.113.45", destinationIp: "192.168.1.50", protocol: "TCP", details: "Repeated connection attempts to closed port 22 (SSH)" },
  { id: "net-004", timestamp: "14:32:21", sourceIp: "192.168.1.50", destinationIp: "8.8.8.8", protocol: "ICMP", details: "Ping to Google DNS" },
  { id: "net-005", timestamp: "14:32:25", sourceIp: "198.51.100.12", destinationIp: "192.168.1.75", protocol: "TCP", details: "Large data exfiltration-like outbound traffic to unknown IP" },
];
