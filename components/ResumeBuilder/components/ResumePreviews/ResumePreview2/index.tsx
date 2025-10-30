import { useResume } from "../components/ResumeScaffold";

const ResumePreviewPage = () => {
  const { resumeData, showLinks } = useResume();
  console.log("resumeData", resumeData);

  return (
    <>
      {/* Header table: left = location/links, center = name/title, right = contact */}
      <table width="100%" cellPadding={6} cellSpacing={0} className="mb-4 ">
        <tbody>
          <tr>
            <td width="33%" valign="top" style={{ fontSize: "10pt" }}>
              {/* left: location + links */}
              <div>{resumeData.personalInfo.location || "Kerala, India"}</div>

              {resumeData.personalInfo.portfolioWebsite && (
                <div style={{ marginTop: 6 }}>
                  <a
                    href={resumeData.personalInfo.portfolioWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700"
                  >
                    {showLinks
                      ? resumeData.personalInfo.portfolioWebsite.replace(
                          /^https?:\/\//,
                          "",
                        )
                      : "Portfolio"}
                  </a>
                </div>
              )}
            </td>

            <td
              width="34%"
              align="center"
              valign="middle"
              style={{ paddingTop: 6, paddingBottom: 6 }}
            >
              {/* center: name (uppercase) */}
              <div style={{ textAlign: "center" }}>
                <h1
                  className="font-bold"
                  style={{
                    fontSize: "16pt",
                    width: "320px",
                    letterSpacing: "1pt",
                    margin: 0,
                  }}
                >
                  {resumeData.personalInfo.name
                    ? resumeData.personalInfo.name.toUpperCase()
                    : ""}
                </h1>
              </div>
            </td>

            <td
              width="33%"
              valign="top"
              align="right"
              style={{ fontSize: "10pt" }}
            >
              {/* right: contact */}
              {resumeData.personalInfo.phone && (
                <div>{resumeData.personalInfo.phone}</div>
              )}
              {resumeData.personalInfo.email && (
                <div style={{ marginTop: 6 }}>
                  {resumeData.personalInfo.email}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <table
          width="100%"
          cellPadding={6}
          cellSpacing={0}
          className="mb-3 resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="font-bold mb-1"
                  style={{ fontSize: "11pt", margin: 0 }}
                >
                  SUMMARY
                </h2>
                <p
                  style={{
                    fontSize: "10pt",
                    textAlign: "justify",
                    lineHeight: "1.2",
                    marginTop: 6,
                  }}
                >
                  {resumeData.personalInfo.summary}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {/* Skills */}
      <table
        width="100%"
        cellPadding={6}
        cellSpacing={0}
        className="mb-3 resume-section"
      >
        <tbody>
          <tr>
            <td>
              <div style={{ fontSize: "10pt", lineHeight: "1.2" }}>
                {resumeData.skills.languages?.filter(Boolean).length > 0 && (
                  <div>
                    <span className="font-bold">
                      Programming Languages & Frameworks:{" "}
                    </span>
                    {resumeData.skills.languages.filter(Boolean).join(", ")}
                  </div>
                )}
                {resumeData.skills.frameworks?.filter(Boolean).length > 0 && (
                  <div style={{ marginTop: 4 }}>
                    <span className="font-bold">Frameworks & Libraries: </span>
                    {resumeData.skills.frameworks.filter(Boolean).join(", ")}
                  </div>
                )}
                {resumeData.skills.databases?.filter(Boolean).length > 0 && (
                  <div style={{ marginTop: 4 }}>
                    <span className="font-bold">Databases & ORM: </span>
                    {resumeData.skills.databases.filter(Boolean).join(", ")}
                  </div>
                )}
                {resumeData.skills.tools?.filter(Boolean).length > 0 && (
                  <div style={{ marginTop: 4 }}>
                    <span className="font-bold">Cloud & DevOps Tools: </span>
                    {resumeData.skills.tools.filter(Boolean).join(", ")}
                  </div>
                )}
                {resumeData.skills.architectures?.filter(Boolean).length >
                  0 && (
                  <div style={{ marginTop: 4 }}>
                    <span className="font-bold">Architectures: </span>
                    {resumeData.skills.architectures.filter(Boolean).join(", ")}
                  </div>
                )}
                {resumeData.skills.methodologies?.filter(Boolean).length >
                  0 && (
                  <div style={{ marginTop: 4 }}>
                    <span className="font-bold">Software Practices: </span>
                    {resumeData.skills.methodologies.filter(Boolean).join(", ")}
                  </div>
                )}
                {resumeData.skills.other?.filter(Boolean).length > 0 && (
                  <div style={{ marginTop: 4 }}>
                    <span className="font-bold">Other Skills: </span>
                    {resumeData.skills.other.filter(Boolean).join(", ")}
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Employment */}
      <table
        width="100%"
        cellPadding={6}
        cellSpacing={0}
        className="mb-2 resume-section"
      >
        <tbody>
          <tr>
            <td>
              <h2
                className="font-bold mb-1"
                style={{ fontSize: "11pt", margin: 0 }}
              >
                EMPLOYMENT
              </h2>

              {resumeData.experience.map((exp, idx) =>
                exp.positions.map((position, pIdx) => (
                  <table
                    key={`${idx}-${pIdx}`}
                    width="100%"
                    cellPadding={4}
                    cellSpacing={0}
                    style={{ marginTop: 10 }}
                  >
                    <tbody>
                      <tr>
                        <td valign="top" style={{ fontSize: "10pt" }}>
                          <span className="font-bold">{position.title}</span>{" "}
                          <span> | {exp.company}</span>
                        </td>
                        <td
                          valign="top"
                          align="right"
                          style={{ fontSize: "10pt", whiteSpace: "nowrap" }}
                        >
                          {position.duration}
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={2} style={{ paddingTop: 6 }}>
                          <ul
                            style={{
                              margin: 0,
                              paddingLeft: 16,
                              fontSize: "10pt",
                              lineHeight: "1.2",
                            }}
                          >
                            {position.achievements?.map((ach, aIdx) => (
                              <li
                                key={aIdx}
                                style={{
                                  marginBottom: 6,
                                  textAlign: "justify",
                                }}
                              >
                                ● {ach}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )),
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {/* Projects */}
      {resumeData.projects?.length > 0 && (
        <table
          width="100%"
          cellPadding={6}
          cellSpacing={0}
          className="mb-2 resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="font-bold mb-1"
                  style={{ fontSize: "11pt", margin: 0 }}
                >
                  PROJECTS
                </h2>

                <div style={{ marginTop: 8 }}>
                  {resumeData.projects.map((project, pIdx) => (
                    <table
                      key={pIdx}
                      width="100%"
                      cellPadding={4}
                      cellSpacing={0}
                      style={{ marginBottom: 8 }}
                    >
                      <tbody>
                        <tr>
                          <td valign="top" style={{ fontSize: "10pt" }}>
                            <span className="font-bold">● {project.name}</span>:{" "}
                            {project.description}
                          </td>
                        </tr>
                        {project.technologies?.filter(Boolean).length > 0 && (
                          <tr>
                            <td style={{ fontSize: "10pt", paddingTop: 6 }}>
                              <div className="italic">
                                Tech Stack:{" "}
                                {project.technologies
                                  .filter(Boolean)
                                  .join(", ")}
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {/* Education */}
      <table
        width="100%"
        cellPadding={6}
        cellSpacing={0}
        className="mb-3 resume-section"
      >
        <tbody>
          <tr>
            <td>
              <h2
                className="font-bold mb-1"
                style={{ fontSize: "11pt", margin: 0 }}
              >
                EDUCATION
              </h2>

              <div style={{ marginTop: 8 }}>
                {resumeData.education.map((edu, eIdx) => (
                  <table
                    key={eIdx}
                    width="100%"
                    cellPadding={4}
                    cellSpacing={0}
                    style={{ marginBottom: 8 }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ fontSize: "10pt" }}>{edu.institution}</td>
                        <td
                          align="right"
                          style={{ fontSize: "10pt", whiteSpace: "nowrap" }}
                        >
                          {edu.year || ""}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={2}
                          style={{ fontSize: "10pt", paddingTop: 4 }}
                        >
                          ● {edu.degree}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Achievements */}
      {resumeData.achievements?.filter(Boolean).length > 0 && (
        <table
          width="100%"
          cellPadding={6}
          cellSpacing={0}
          className="mb-2 resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="font-bold mb-1"
                  style={{ fontSize: "11pt", margin: 0 }}
                >
                  ADDITIONAL EXPERIENCE AND AWARDS
                </h2>
                <ul
                  style={{
                    marginTop: 8,
                    paddingLeft: 16,
                    fontSize: "10pt",
                    lineHeight: "1.2",
                  }}
                >
                  {resumeData.achievements.filter(Boolean).map((ach, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      ● {ach}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {/* Interests */}
      {resumeData.interests?.filter(Boolean).length > 0 && (
        <table
          width="100%"
          cellPadding={6}
          cellSpacing={0}
          className="resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="font-bold mb-1"
                  style={{ fontSize: "11pt", margin: 0 }}
                >
                  INTERESTS
                </h2>
                <p style={{ fontSize: "10pt", marginTop: 8 }}>
                  {resumeData.interests.filter(Boolean).join(", ")}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
export default ResumePreviewPage;
