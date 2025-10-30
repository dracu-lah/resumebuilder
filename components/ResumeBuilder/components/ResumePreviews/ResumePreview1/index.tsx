import { useResume } from "../components/ResumeScaffold";

const ResumePreviewPage = () => {
  const { resumeData, showLinks } = useResume();
  return (
    <>
      <table
        width="100%"
        cellPadding={6}
        cellSpacing={0}
        className="mb-6 resume-section table-fixed"
      >
        <tbody>
          <tr>
            <td className="w-3/5 align-top text-[18pt]">
              <div className="font-extrabold text-[20pt] leading-none">
                {resumeData.personalInfo?.name || ""}
              </div>

              <div className="mt-1.5 text-[10pt] text-[#333]">
                {resumeData.personalInfo?.title && (
                  <div className="text-[11pt] font-semibold text-[#222]">
                    {resumeData.personalInfo.title}
                  </div>
                )}

                <div className="mt-1.5">
                  {resumeData.personalInfo?.portfolioWebsite && (
                    <span className="mr-3">
                      <a
                        href={resumeData.personalInfo.portfolioWebsite}
                        className="text-indigo-700"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {showLinks
                          ? resumeData.personalInfo.portfolioWebsite.replace(
                              /^https?:\/\//,
                              "",
                            )
                          : "Website"}
                      </a>
                    </span>
                  )}

                  {resumeData.personalInfo?.linkedInUrl && (
                    <span>
                      <a
                        href={resumeData.personalInfo.linkedInUrl}
                        className="text-indigo-700"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {showLinks
                          ? resumeData.personalInfo.linkedInUrl.replace(
                              /^https?:\/\//,
                              "",
                            )
                          : "LinkedIn"}
                      </a>
                    </span>
                  )}
                </div>

                <div className="mt-2 flex gap-2 items-center text-[11pt] text-[#222]">
                  {resumeData.personalInfo?.phone && (
                    <div>{resumeData.personalInfo.phone}</div>
                  )}
                  {resumeData.personalInfo?.phone &&
                    resumeData.personalInfo?.email && <div>|</div>}
                  {resumeData.personalInfo?.email && (
                    <div>{resumeData.personalInfo.email}</div>
                  )}
                </div>
              </div>
            </td>

            <td className="w-2/5 align-top text-right text-[10pt]">
              <div className="text-[#222] text-right text-[11pt]">
                {resumeData.personalInfo?.phone && (
                  <div>{resumeData.personalInfo.phone}</div>
                )}
                {resumeData.personalInfo?.email && (
                  <div className="mt-1.5">{resumeData.personalInfo.email}</div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Profile Summary */}
      <section className="mb-[18px]">
        <div className="text-[14pt] font-bold mb-2">PROFILE SUMMARY</div>
        {resumeData.personalInfo?.title && (
          <div className="text-[12pt] font-semibold mb-1.5">
            {resumeData.personalInfo.title}
          </div>
        )}
        {resumeData.personalInfo?.summary && (
          <p className="text-[11pt] text-justify m-0">
            {resumeData.personalInfo.summary}
          </p>
        )}
      </section>

      {/* Experience */}
      {Array.isArray(resumeData.experience) &&
        resumeData.experience.length > 0 && (
          <section className="mb-[18px]">
            <div className="text-[14pt] font-bold mb-2">EXPERIENCE</div>

            {Array.isArray(resumeData.experience) &&
              resumeData.experience.map((exp, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <div className="text-[12pt] font-bold">{exp.company}</div>
                  </div>

                  {Array.isArray(exp.positions) &&
                    exp.positions.map((position, pIdx) => (
                      <div key={pIdx} className="pt-2.5">
                        <div className="flex justify-between items-baseline gap-3">
                          <div className="text-[11pt] font-semibold">
                            {position.title}
                          </div>
                          <div className="text-[10pt] font-medium text-[#444]">
                            {position.duration}
                          </div>
                        </div>

                        {Array.isArray(position.achievements) &&
                          position.achievements.filter(Boolean).length > 0 && (
                            <ul className="mt-2 pl-[18px] text-[10pt] leading-[1.4] list-disc">
                              {position.achievements
                                .filter(Boolean)
                                .map((ach, aIdx) => (
                                  <li
                                    key={aIdx}
                                    className="mb-1.5 text-justify"
                                  >
                                    {ach}
                                  </li>
                                ))}
                            </ul>
                          )}
                      </div>
                    ))}
                </div>
              ))}
          </section>
        )}

      {/* Technical Skills */}
      {Object.values(resumeData.skills).some(
        (skillArray) => skillArray?.filter(Boolean).length > 0,
      ) && (
        <section className="mb-[18px]">
          <div className="text-[14pt] font-bold mb-2">TECHNICAL SKILLS</div>
          <div className="text-[10pt] leading-[1.35] text-[#222]">
            {resumeData.skills?.languages?.filter(Boolean).length > 0 && (
              <div className="mb-1.5">
                <strong>Languages:</strong>{" "}
                {resumeData.skills.languages.filter(Boolean).join(", ")}
              </div>
            )}
            {resumeData.skills?.frameworks?.filter(Boolean).length > 0 && (
              <div className="mb-1.5">
                <strong>Frameworks & Libraries:</strong>{" "}
                {resumeData.skills.frameworks.filter(Boolean).join(", ")}
              </div>
            )}
            {resumeData.skills?.databases?.filter(Boolean).length > 0 && (
              <div className="mb-1.5">
                <strong>Databases:</strong>{" "}
                {resumeData.skills.databases.filter(Boolean).join(", ")}
              </div>
            )}
            {resumeData.skills?.architectures?.filter(Boolean).length > 0 && (
              <div className="mb-1.5">
                <strong>Architectures:</strong>{" "}
                {resumeData.skills.architectures.filter(Boolean).join(", ")}
              </div>
            )}
            {resumeData.skills?.tools?.filter(Boolean).length > 0 && (
              <div className="mb-1.5">
                <strong>Tools & Platforms:</strong>{" "}
                {resumeData.skills.tools.filter(Boolean).join(", ")}
              </div>
            )}
            {resumeData.skills?.methodologies?.filter(Boolean).length > 0 && (
              <div className="mb-1.5">
                <strong>Methodologies:</strong>{" "}
                {resumeData.skills.methodologies.filter(Boolean).join(", ")}
              </div>
            )}
            {resumeData.skills?.other?.filter(Boolean).length > 0 && (
              <div className="mb-1.5">
                <strong>Other Skills:</strong>{" "}
                {resumeData.skills.other.filter(Boolean).join(", ")}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {Array.isArray(resumeData.projects) && resumeData.projects.length > 0 && (
        <section className="mb-[18px]">
          <div className="text-[14pt] font-bold mb-2">PROJECTS</div>
          {resumeData.projects.map((project, pIdx) => (
            <div key={pIdx} className="mb-3">
              <div className="text-[12pt] font-bold">
                {project.name}
                {project.link && (
                  <span className="ml-2">
                    <a
                      href={project.link}
                      className="text-indigo-700 no-underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {showLinks ? project.link : "Link"}
                    </a>
                  </span>
                )}
              </div>

              <div className="text-[10pt] pt-2">
                {project.role && (
                  <div className="font-semibold mb-1.5">{`Role: ${project.role}`}</div>
                )}
                <div className="mb-1.5 text-justify">{project.description}</div>
                {project.technologies?.filter(Boolean).length > 0 && (
                  <div className="italic">
                    Technologies:{" "}
                    {project.technologies.filter(Boolean).join(", ")}
                  </div>
                )}
                {project.features?.filter(Boolean).length > 0 && (
                  <ul className="mt-1.5 pl-[18px] list-disc">
                    {project.features.filter(Boolean).map((f, i) => (
                      <li key={i} className="mb-1.5">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-[18px]">
          <div className="text-[14pt] font-bold mb-2">EDUCATION</div>
          {resumeData.education?.map((edu, eIdx) => (
            <div key={eIdx} className="mb-2.5 text-[11pt]">
              <div className="font-bold">
                {edu.degree}
                {edu.year ? ` [${edu.year}]` : ""}
              </div>
              <div>{edu.institution}</div>
            </div>
          ))}
        </section>
      )}

      {/* Achievements and Interests */}
      {(resumeData.achievements?.filter(Boolean).length > 0 ||
        resumeData.interests?.filter(Boolean).length > 0) && (
        <section className="mb-[18px]">
          {resumeData.achievements?.filter(Boolean).length > 0 && (
            <>
              <div className="text-[14pt] font-bold mb-2">
                ACHIEVEMENTS AND CERTIFICATES
              </div>
              <ul className="pl-[18px] mb-3 list-disc">
                {resumeData.achievements.filter(Boolean).map((ach, aIdx) => (
                  <li key={aIdx} className="mb-1.5 text-[10pt]">
                    {ach}
                  </li>
                ))}
              </ul>
            </>
          )}

          {resumeData.interests?.filter(Boolean).length > 0 && (
            <>
              <div className="text-[14pt] font-bold mt-2">INTERESTS</div>
              <div className="text-[10pt]">
                {resumeData.interests.filter(Boolean).join(", ")}
              </div>
            </>
          )}

          {resumeData.knownLanguages?.filter(Boolean).length > 0 && (
            <>
              <div className="text-[14pt] font-bold mt-2">LANGUAGES</div>
              <div className="text-[10pt]">
                {resumeData.knownLanguages.filter(Boolean).join(", ")}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};
export default ResumePreviewPage;
