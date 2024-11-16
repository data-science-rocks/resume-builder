import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { GripVertical, X } from 'lucide-react';

const ResumeBuilder = () => {
  // Store selected bullets with their job context
  const [selectedBullets, setSelectedBullets] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  
  const jobDescription = `
    Senior Software Engineer
    
    We're looking for an experienced software engineer with:
    - 5+ years of React development
    - Experience with cloud infrastructure
    - Strong communication skills
    - Experience leading small teams
    - Background in agile development
  `;

  const experienceData = [
    {
      id: 1,
      company: "Tech Corp",
      title: "Senior Software Engineer",
      dates: "2020 - Present",
      bullets: [
        "Led team of 5 developers in delivering major platform upgrade",
        "Implemented CI/CD pipeline reducing deployment time by 50%",
        "Mentored 3 junior developers",
        "Architected microservices infrastructure serving 1M+ requests/day",
      ]
    },
    {
      id: 2,
      company: "StartupCo",
      title: "Full Stack Developer",
      dates: "2018 - 2020",
      bullets: [
        "Built React components used by 100k+ users",
        "Reduced AWS costs by 30% through optimization",
        "Presented technical proposals to stakeholders",
        "Implemented responsive design principles across platform",
      ]
    }
  ];

  const skillsData = {
    "Technical Skills": [
      "React", "Node.js", "Python", "TypeScript", "Docker", "Kubernetes",
      "AWS", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST APIs"
    ],
    "Tools & Methodologies": [
      "Git", "CI/CD", "Agile", "Scrum", "Jira", "Confluence",
      "Test-Driven Development", "DevOps", "Microservices"
    ],
    "Soft Skills": [
      "Team Leadership", "Project Management", "Technical Writing",
      "Public Speaking", "Mentoring", "Problem Solving", "Communication"
    ]
  };

  const handleBulletSelect = (jobId, jobInfo, bullet) => {
    const bulletWithContext = {
      jobId,
      company: jobInfo.company,
      title: jobInfo.title,
      dates: jobInfo.dates,
      bullet
    };

    setSelectedBullets(prev => {
      const exists = prev.some(b => b.jobId === jobId && b.bullet === bullet);
      if (exists) {
        return prev.filter(b => !(b.jobId === jobId && b.bullet === bullet));
      }
      return [...prev, bulletWithContext];
    });
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Group selected bullets by company for display
  const groupedBullets = selectedBullets.reduce((acc, bullet) => {
    if (!acc[bullet.jobId]) {
      acc[bullet.jobId] = {
        company: bullet.company,
        title: bullet.title,
        dates: bullet.dates,
        bullets: []
      };
    }
    acc[bullet.jobId].bullets.push(bullet.bullet);
    return acc;
  }, {});

  return (
    <div className="h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-3 gap-4 h-full">
        {/* Job Description Panel */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Job Description</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="whitespace-pre-wrap">{jobDescription}</div>
          </ScrollArea>
        </Card>

        {/* Resume Preview Panel */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {/* Experience Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Experience</h3>
                {Object.values(groupedBullets).map((job) => (
                  <div key={job.company} className="mb-6">
                    <div className="mb-2">
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company} | {job.dates}</p>
                    </div>
                    <ul className="list-disc ml-4 space-y-1">
                      {job.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-sm">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Skills Section */}
              {selectedSkills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <Badge 
                        key={skill}
                        className="cursor-pointer"
                        onClick={() => handleSkillSelect(skill)}
                      >
                        {skill} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Components Panel */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Components</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-8">
              {/* Experience Components */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Experience</h3>
                <div className="space-y-6">
                  {experienceData.map((job) => (
                    <div key={job.id} className="space-y-2">
                      <div className="font-medium">{job.title} - {job.company}</div>
                      {job.bullets.map((bullet, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                            selectedBullets.some(b => b.jobId === job.id && b.bullet === bullet)
                              ? 'bg-blue-100 hover:bg-blue-200'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => handleBulletSelect(job.id, job, bullet)}
                        >
                          <GripVertical className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Components */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                {Object.entries(skillsData).map(([category, skills]) => (
                  <div key={category} className="mb-6">
                    <h4 className="font-medium text-sm text-gray-600 mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => handleSkillSelect(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
