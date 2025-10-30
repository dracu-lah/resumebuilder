import { useResume } from "../components/ResumeScaffold";

const ResumePreviewPage = () => {
  const { resumeData, showLinks } = useResume();
  return (
    <>
      {/* Header Section */}
      <table width="100%" cellPadding="0" cellSpacing="0" className="mb-6">
        <tbody>
          <tr>
            <td width="50%" valign="top">
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <h1
                        className="text-2xl font-bold mb-1"
                        style={{
                          fontSize: "18pt",
                          fontFamily: "Arial, sans-serif",
                        }}
                      >
                        {resumeData.personalInfo?.name || "Your Name"}
                      </h1>
                    </td>
                  </tr>
                  {resumeData.personalInfo?.location && (
                    <tr>
                      <td className="text-sm" style={{ fontSize: "10pt" }}>
                        {resumeData.personalInfo.location}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
            <td width="50%" valign="top" align="right">
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td
                      align="right"
                      className="text-sm"
                      style={{ fontSize: "10pt" }}
                    >
                      {resumeData.personalInfo?.linkedInUrl && (
                        <div>
                          <a
                            href={resumeData.personalInfo.linkedInUrl}
                            className="text-indigo-600"
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
                      {resumeData.personalInfo?.portfolioWebsite && (
                        <div>
                          <a
                            href={resumeData.personalInfo.portfolioWebsite}
                            className="text-indigo-600"
                          >
                            {!showLinks
                              ? "Portfolio"
                              : resumeData.personalInfo.portfolioWebsite.replace(
                                  "https://",
                                  "",
                                )}
                          </a>
                        </div>
                      )}
                      {resumeData.personalInfo?.phone && (
                        <div>{resumeData.personalInfo.phone}</div>
                      )}
                      {resumeData.personalInfo?.email && (
                        <div>{resumeData.personalInfo.email}</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Summary Section */}
      {resumeData.personalInfo?.summary && (
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          className="mb-6 resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ fontSize: "14pt", fontFamily: "Arial, sans-serif" }}
                >
                  Summary
                </h2>
                <p
                  className="text-justify"
                  style={{ fontSize: "11pt", lineHeight: "1.4" }}
                >
                  {resumeData.personalInfo.summary}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Skills Section */}
      {resumeData.skills && (
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          className="mb-6 resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ fontSize: "14pt", fontFamily: "Arial, sans-serif" }}
                >
                  Technical Skills
                </h2>
                <table width="100%" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      {resumeData.skills.languages?.filter(Boolean).length >
                        0 && (
                        <td width="33%" valign="top">
                          <table cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    fontSize: "10pt",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  <strong>Languages:</strong>
                                  <br />
                                  {resumeData.skills.languages
                                    .filter(Boolean)
                                    .join(", ")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      )}
                      {resumeData.skills.frameworks?.filter(Boolean).length >
                        0 && (
                        <td width="33%" valign="top">
                          <table cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    fontSize: "10pt",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  <strong>Frameworks & Libraries:</strong>
                                  <br />
                                  {resumeData.skills.frameworks
                                    .filter(Boolean)
                                    .join(", ")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      )}
                      {resumeData.skills.tools?.filter(Boolean).length > 0 && (
                        <td width="33%" valign="top">
                          <table cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    fontSize: "10pt",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  <strong>Tools & Platforms:</strong>
                                  <br />
                                  {resumeData.skills.tools
                                    .filter(Boolean)
                                    .join(", ")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      )}
                    </tr>
                    {resumeData.skills.databases?.filter(Boolean).length >
                      0 && (
                      <tr>
                        <td colSpan={3} height="8"></td>
                      </tr>
                    )}
                    {resumeData.skills.databases?.filter(Boolean).length >
                      0 && (
                      <tr>
                        <td width="33%" valign="top">
                          <table cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    fontSize: "10pt",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  <strong>Databases:</strong>
                                  <br />
                                  {resumeData.skills.databases
                                    .filter(Boolean)
                                    .join(", ")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td width="67%" colSpan={2}></td>
                      </tr>
                    )}
                    {resumeData.skills.other?.filter(Boolean).length > 0 && (
                      <tr>
                        <td colSpan={3} height="8"></td>
                      </tr>
                    )}
                    {resumeData.skills.other?.filter(Boolean).length > 0 && (
                      <tr>
                        <td colSpan={3} valign="top">
                          <table cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    fontSize: "10pt",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  <strong>Other Skills:</strong>
                                  <br />
                                  {resumeData.skills.other
                                    .filter(Boolean)
                                    .join(", ")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Horizontal Line */}
      <table width="100%" cellPadding="0" cellSpacing="0" className="mb-6">
        <tbody>
          <tr>
            <td style={{ borderBottom: "1px solid #000", height: "1px" }}></td>
          </tr>
        </tbody>
      </table>

      {/* Employment Section */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          className="mb-6 resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ fontSize: "14pt", fontFamily: "Arial, sans-serif" }}
                >
                  Work Experience
                </h2>

                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    {exp.positions?.map((position, posIndex: number) => (
                      <table
                        key={posIndex}
                        width="100%"
                        cellPadding="0"
                        cellSpacing="0"
                        className={posIndex > 0 ? "mt-3" : ""}
                      >
                        <tbody>
                          <tr>
                            <td width="70%" valign="top">
                              <table cellPadding="0" cellSpacing="0">
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        fontSize: "12pt",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {position.title}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td width="30%" valign="top" align="right">
                              <table cellPadding="0" cellSpacing="0">
                                <tbody>
                                  <tr>
                                    <td
                                      align="right"
                                      style={{
                                        fontSize: "10pt",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {position.duration}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={2}
                              style={{ fontSize: "11pt", fontStyle: "italic" }}
                            >
                              {exp.company}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} height="8"></td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <table
                                width="100%"
                                cellPadding="0"
                                cellSpacing="0"
                              >
                                <tbody>
                                  {position.achievements?.map(
                                    (achievement, achIndex) => (
                                      <tr key={achIndex}>
                                        <td
                                          width="20"
                                          valign="top"
                                          style={{ fontSize: "10pt" }}
                                        >
                                          •
                                        </td>
                                        <td
                                          style={{
                                            fontSize: "10pt",
                                            lineHeight: "1.4",
                                            textAlign: "justify",
                                          }}
                                        >
                                          {achievement}
                                        </td>
                                      </tr>
                                    ),
                                  )}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Projects Section */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          className="mb-6 resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ fontSize: "14pt", fontFamily: "Arial, sans-serif" }}
                >
                  Projects
                </h2>

                {resumeData.projects.map((project, index) => (
                  <table
                    key={index}
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                    className="mb-4"
                  >
                    <tbody>
                      <tr>
                        <td style={{ fontSize: "12pt", fontWeight: "bold" }}>
                          {project.name}
                          {project.link && (
                            <>
                              {" | "}
                              <a
                                href={project.link}
                                className="text-indigo-700 font-normal"
                                style={{
                                  fontSize: "10pt",
                                  fontWeight: "normal",
                                }}
                              >
                                {!showLinks ? "Link" : project.link}
                              </a>
                            </>
                          )}
                        </td>
                      </tr>
                      {project.technologies?.filter(Boolean).length > 0 && (
                        <tr>
                          <td style={{ fontSize: "10pt" }}>
                            <strong>Tech Stack:</strong>{" "}
                            {project.technologies.filter(Boolean).join(", ")}
                          </td>
                        </tr>
                      )}
                      {project.description && (
                        <>
                          <tr>
                            <td height="8"></td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontSize: "10pt",
                                lineHeight: "1.4",
                                textAlign: "justify",
                              }}
                            >
                              {project.description}
                            </td>
                          </tr>
                        </>
                      )}
                      {project.features?.filter(Boolean).length > 0 && (
                        <>
                          <tr>
                            <td height="8"></td>
                          </tr>
                          <tr>
                            <td>
                              <table
                                width="100%"
                                cellPadding="0"
                                cellSpacing="0"
                              >
                                <tbody>
                                  {project.features
                                    .filter(Boolean)
                                    .map((feature, featIndex) => (
                                      <tr key={featIndex}>
                                        <td
                                          width="20"
                                          valign="top"
                                          style={{ fontSize: "10pt" }}
                                        >
                                          •
                                        </td>
                                        <td
                                          style={{
                                            fontSize: "10pt",
                                            lineHeight: "1.4",
                                            textAlign: "justify",
                                          }}
                                        >
                                          {feature}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Achievements & Leadership Section */}
      {resumeData.achievements?.filter(Boolean).length > 0 && (
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          className="mb-6 resume-section"
        >
          <tbody>
            <tr>
              <td>
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ fontSize: "14pt", fontFamily: "Arial, sans-serif" }}
                >
                  Achievements & Leadership
                </h2>
                <table width="100%" cellPadding="0" cellSpacing="0">
                  <tbody>
                    {resumeData.achievements
                      .filter(Boolean)
                      .map((achievement, index) => (
                        <tr key={index}>
                          <td
                            width="20"
                            valign="top"
                            style={{ fontSize: "10pt" }}
                          >
                            •
                          </td>
                          <td
                            style={{
                              fontSize: "10pt",
                              lineHeight: "1.4",
                              textAlign: "justify",
                            }}
                          >
                            {achievement}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
export default ResumePreviewPage;
