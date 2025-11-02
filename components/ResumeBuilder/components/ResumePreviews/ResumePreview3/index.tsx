import { useResume } from "../components/ResumeScaffold";

const ResumePreviewPage = () => {
  const { resumeData, showLinks } = useResume();

  return (
    <div className="font-['Arial'] text-[11pt] leading-[1.35] text-gray-900 ">
      {/* HEADER */}
      <div className="">
        <div className="flex justify-between items-start mb-2">
          <div className="w-[70%]">
            <h1 className="text-[16pt] font-bold  text-black">
              {resumeData.personalInfo.name}
            </h1>
            <div className="flex gap-2">
              {resumeData.personalInfo.portfolioWebsite && (
                <div className="text-[10pt]">
                  <a
                    href={resumeData.personalInfo.portfolioWebsite}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    {!showLinks
                      ? "Website"
                      : resumeData.personalInfo.portfolioWebsite}
                  </a>
                </div>
              )}
              {resumeData.personalInfo.linkedInUrl && (
                <div className="text-[10pt]">
                  <a
                    href={resumeData.personalInfo.linkedInUrl}
                    className="text-blue-700 font-semibold hover:underline"
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
            </div>
          </div>
          <div className="w-[30%] text-right text-[10pt] leading-[1.4]">
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
          </div>
        </div>
      </div>
      <hr className="border-t border-black my-2" />

      {/* SKILLS */}
      <div className="mb-3">
        <h2 className="text-[11pt] font-bold text-center ">SUMMARY</h2>
        <div className="mb-2 text-justify text-sm">
          {resumeData.personalInfo.summary}
        </div>
        <div className="space-y-0 text-sm">
          {Object.entries(resumeData.skills).map(([key, value]) =>
            value.filter(Boolean).length > 0 ? (
              <div key={key} className="flex">
                <div className="w-[28%] font-bold pr-2">
                  • {key.charAt(0).toUpperCase() + key.slice(1)}:
                </div>
                <div className="flex-1">{value.filter(Boolean).join(", ")}</div>
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* EXPERIENCE */}
      {resumeData.experience.length > 0 && (
        <>
          <hr className="border-t border-black my-2" />
          <div className="mb-3">
            <h2 className="text-[11pt] font-bold text-center ">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-3">
              {resumeData.experience.map((exp, i) =>
                exp.positions.map((pos, j) => (
                  <div key={`${i}-${j}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10pt] font-bold">
                        {pos.title.toUpperCase()} | {exp.company.toUpperCase()}
                      </span>
                      <span className="text-[9.5pt] font-semibold">
                        {pos.duration}
                      </span>
                    </div>
                    <ul className="ml-4 space-y-0.5">
                      {pos.achievements.map((a, k) => (
                        <li key={k} className="text-[9pt] text-justify">
                          ○ {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )),
              )}
            </div>
          </div>
        </>
      )}

      {/* PROJECTS */}
      {resumeData.projects?.length > 0 && (
        <>
          <hr className="border-t border-black my-2" />
          <div className="mb-3">
            <h2 className="text-[11pt] font-bold text-center ">PROJECTS</h2>
            <div className="space-y-3">
              {resumeData.projects.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-[10pt] font-bold">
                      {p.name.toUpperCase()}{" "}
                      {p.link && (
                        <>
                          |{" "}
                          <a
                            href={p.link}
                            className="text-blue-700 font-semibold hover:underline"
                          >
                            {!showLinks ? "Link" : p.link}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  <ul className="ml-4 space-y-0.5">
                    <li className="text-[9pt] text-justify">
                      ○ {p.description}
                    </li>
                    {p.features.filter(Boolean).map((f, j) => (
                      <li key={j} className="text-[9pt] text-justify">
                        ○ {f}
                      </li>
                    ))}
                    {p.technologies.filter(Boolean).length > 0 && (
                      <li className="text-[9pt]">
                        ○ <strong>Technologies:</strong>{" "}
                        {p.technologies.join(", ")}
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* EDUCATION */}
      {resumeData.education.length > 0 && (
        <>
          <hr className="border-t border-black my-2" />
          <div className="mb-3">
            <h2 className="text-[11pt] font-bold text-center ">EDUCATION</h2>
            <div className="space-y-2">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="flex justify-between">
                  <div className="w-[65%] pr-4">
                    <div className="font-bold">{edu.institution}</div>
                    <div>{edu.degree}</div>
                  </div>
                  <div className="w-[35%] text-right leading-[1.4]"></div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ACHIEVEMENTS */}
      {resumeData.achievements.filter(Boolean).length > 0 && (
        <>
          <hr className="border-t border-black my-2" />
          <div className="mb-3">
            <h2 className="text-[11pt] font-bold text-center ">
              ACHIEVEMENTS AND CERTIFICATES
            </h2>
            <ul className="ml-4 space-y-0.5">
              {resumeData.achievements.map((a, i) => (
                <li key={i} className="text-[9pt] text-justify">
                  ○ {a}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumePreviewPage;
