"use client"

import { useState } from "react"
import { H3, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"

type VendorSubmission = { id: string; companyName: string; contactPerson: string; email: string; phone: string; productCategory: string; message?: string | null; createdAt: Date }
type CustomerSubmission = { id: string; name: string; email: string; phone: string; location: string; productInterest: string; createdAt: Date }
type JobApplication = { id: string; jobId: string; name: string; email: string; resumeUrl: string; coverLetter: string | null; createdAt: Date; job: { title: string } }

export function SubmissionsClient({ 
  vendors, 
  customers, 
  applications 
}: { 
  vendors: VendorSubmission[], 
  customers: CustomerSubmission[], 
  applications: JobApplication[] 
}) {
  const [tab, setTab] = useState<"vendors" | "customers" | "careers">("vendors")

  const formatDate = (dateString: Date | string) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full space-y-8">
      <div>
        <H3>Form Submissions</H3>
        <Paragraph className="text-muted-foreground mt-1">Review all contact and application requests</Paragraph>
      </div>

      <div className="flex space-x-2 border-b border-border">
        {(["vendors", "customers", "careers"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {tab === t && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground">
              {tab === "vendors" && (
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Message</th>
                </tr>
              )}
              {tab === "customers" && (
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Interest</th>
                </tr>
              )}
              {tab === "careers" && (
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Job Title</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Resume</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-border">
              {tab === "vendors" && vendors.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No vendor submissions yet.</td></tr>
              )}
              {tab === "vendors" && vendors.map(v => (
                <tr key={v.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(v.createdAt)}</td>
                  <td className="px-4 py-3 font-medium">{v.companyName}</td>
                  <td className="px-4 py-3">{v.contactPerson}</td>
                  <td className="px-4 py-3">{v.email}</td>
                  <td className="px-4 py-3">{v.phone}</td>
                  <td className="px-4 py-3">{v.productCategory}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-pre-wrap max-w-xs truncate" title={v.message || "N/A"}>{v.message || "N/A"}</td>
                </tr>
              ))}

              {tab === "customers" && customers.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No customer submissions yet.</td></tr>
              )}
              {tab === "customers" && customers.map(c => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.location}</td>
                  <td className="px-4 py-3">{c.productInterest}</td>
                </tr>
              ))}

              {tab === "careers" && applications.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No job applications yet.</td></tr>
              )}
              {tab === "careers" && applications.map(a => (
                <tr key={a.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(a.createdAt)}</td>
                  <td className="px-4 py-3 font-medium">{a.job.title}</td>
                  <td className="px-4 py-3">{a.name}</td>
                  <td className="px-4 py-3">{a.email}</td>
                  <td className="px-4 py-3">
                    <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
