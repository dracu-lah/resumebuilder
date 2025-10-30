import { useResume } from "../components/ResumeScaffold";

const ResumePreviewPage = () => {
  const { resumeData, showLinks } = useResume();
  return (
    <>
      {/* HEADER */}
      <table width="100%" cellPadding="4" cellSpacing="0" className="mb-2">
        <tbody>
          <tr>
            <td width="70%" valign="top" style={{ fontSize: "10pt" }}>
              <h1
                className="font-bold mb-1"
                style={{ fontSize: "16pt", color: "#000" }}
              >
                {resumeData.personalInfo.name}
              </h1>
              {resumeData.personalInfo.portfolioWebsite && (
                <div>
                  <a
                    href={resumeData.personalInfo.portfolioWebsite}
                    className="font-semibold text-indigo-600"
                  >
                    {!showLinks
                      ? "Website"
                      : resumeData.personalInfo.portfolioWebsite}
                  </a>
                </div>
              )}
              {resumeData.personalInfo.linkedInUrl && (
                <div>
                  <a
                    href={resumeData.personalInfo.linkedInUrl}
                    className="text-indigo-600 font-semibold"
                  >
                    {!showLinks
                      ? "LinkedIn"
                      : resumeData.personalInfo.linkedInUrl.replace(
                          "https://",
                          "",
                        )}
                  </a>
                </div>
              )}
            </td>
            <td
              width="30%"
              align="right"
              valign="top"
              style={{ fontSize: "10pt", lineHeight: "1.4" }}
            >
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {resumeData.personalInfo.email}
              </div>
              {resumeData.personalInfo.phone && (
                <div>
                  <span className="font-semibold">Mobile:</span>{" "}
                  {resumeData.personalInfo.phone}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <hr className="section-border border-t border-black mt-2 mb-2" />

      {/* SKILLS */}
      <table width="100%" className="resume-section" cellPadding="3">
        <tbody>
          <tr>
            <td align="center" colSpan={2}>
              <h2 className="font-bold mb-1" style={{ fontSize: "11pt" }}>
                SKILLS SUMMARY
              </h2>
            </td>
          </tr>
          {Object.entries(resumeData.skills).map(([key, value]) =>
            value.filter(Boolean).length > 0 ? (
              <tr key={key}>
                <td width="28%" valign="top" className="font-bold pr-2">
                  • {key.charAt(0).toUpperCase() + key.slice(1)}:
                </td>
                <td>{value.filter(Boolean).join(", ")}</td>
              </tr>
            ) : null,
          )}
        </tbody>
      </table>
      <hr className="section-border border-t border-black mt-2 mb-2" />

      {/* EXPERIENCE */}
      <table width="100%" className="resume-section" cellPadding="3">
        <tbody>
          <tr>
            <td align="center" colSpan={2}>
              <h2 className="font-bold mb-1" style={{ fontSize: "11pt" }}>
                WORK EXPERIENCE
              </h2>
            </td>
          </tr>
          {resumeData.experience.map((exp, i) =>
            exp.positions.map((pos, j) => (
              <tr key={`${i}-${j}`}>
                <td colSpan={2}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold" style={{ fontSize: "10pt" }}>
                      {pos.title.toUpperCase()} | {exp.company.toUpperCase()}
                    </span>
                    <span
                      className="font-semibold"
                      style={{ fontSize: "9.5pt" }}
                    >
                      {pos.duration}
                    </span>
                  </div>
                  <ul className="ml-4 mt-1 space-y-0.5">
                    {pos.achievements.map((a, k) => (
                      <li
                        key={k}
                        style={{ fontSize: "9pt", textAlign: "justify" }}
                      >
                        ○ {a}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
      <hr className="section-border border-t border-black mt-2 mb-2" />

      {/* PROJECTS */}
      {resumeData.projects?.length > 0 && (
        <>
          <table width="100%" className="resume-section" cellPadding="3">
            <tbody>
              <tr>
                <td align="center" colSpan={2}>
                  <h2 className="font-bold mb-1" style={{ fontSize: "11pt" }}>
                    PROJECTS
                  </h2>
                </td>
              </tr>
              {resumeData.projects.map((p, i) => (
                <tr key={i}>
                  <td colSpan={2}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold" style={{ fontSize: "10pt" }}>
                        {p.name.toUpperCase()}{" "}
                        {p.link && (
                          <>
                            |{" "}
                            <a
                              href={p.link}
                              className="text-indigo-700 font-semibold"
                            >
                              {!showLinks ? "Link" : p.link}
                            </a>
                          </>
                        )}
                      </span>
                    </div>
                    <ul className="ml-4 mt-1 space-y-0.5">
                      <li style={{ fontSize: "9pt", textAlign: "justify" }}>
                        ○ {p.description}
                      </li>
                      {p.features.filter(Boolean).map((f, j) => (
                        <li
                          key={j}
                          style={{ fontSize: "9pt", textAlign: "justify" }}
                        >
                          ○ {f}
                        </li>
                      ))}
                      {p.technologies.filter(Boolean).length > 0 && (
                        <li style={{ fontSize: "9pt" }}>
                          ○ <strong>Technologies:</strong>{" "}
                          {p.technologies.join(", ")}
                        </li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="section-border border-t border-black mt-2 mb-2" />
        </>
      )}

      {/* EDUCATION */}
      <table width="100%" className="resume-section" cellPadding="3">
        <tbody>
          <tr>
            <td align="center" colSpan={2}>
              <h2 className="font-bold mb-1" style={{ fontSize: "11pt" }}>
                EDUCATION
              </h2>
            </td>
          </tr>
          {resumeData.education.map((edu, i) => (
            <tr key={i}>
              <td width="65%" valign="top" style={{ paddingRight: "10px" }}>
                <div className="font-bold">{edu.institution}</div>
                <div>{edu.degree}</div>
              </td>
              <td
                width="35%"
                align="right"
                valign="top"
                style={{ lineHeight: "1.4" }}
              ></td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="section-border border-t border-black mt-2 mb-2" />

      {/* ACHIEVEMENTS */}
      {resumeData.achievements.filter(Boolean).length > 0 && (
        <table width="100%" className="resume-section" cellPadding="3">
          <tbody>
            <tr>
              <td align="center" colSpan={2}>
                <h2 className="font-bold mb-1" style={{ fontSize: "11pt" }}>
                  ACHIEVEMENTS AND CERTIFICATES
                </h2>
              </td>
            </tr>
            {resumeData.achievements.map((a, i) => (
              <tr key={i}>
                <td colSpan={2}>
                  <ul className="ml-4 mt-1 space-y-0.5">
                    <li style={{ fontSize: "9pt", textAlign: "justify" }}>
                      ○ {a}
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default ResumePreviewPage;
