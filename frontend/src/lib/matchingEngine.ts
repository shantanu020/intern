import { ProfileState, Skill } from "@/store/useProfileStore";

export interface Role {
  id: string;
  title: string;
  company: string;
  type: string; // Micro, Short-term, Full-term
  location: string;
  mode: string; // Remote, Hybrid, On-site
  duration: string;
  stipend: string;
  requiredSkills: string[];
  preferredHours?: number;
  domain?: string;
}

export interface MatchResult {
  score: number;
  breakdown: {
    skills: number;
    logistics: number;
    style: number;
    strength: number;
  };
}

export function calculateMatchScore(profile: ProfileState, role: Role): MatchResult {
  let skillScore = 0;
  let logisticsScore = 0;
  let styleScore = 0;
  let strengthScore = profile.getCompletionPercentage();

  // 1. Skill Match (40%)
  if (role.requiredSkills.length > 0) {
    const matchedSkills = role.requiredSkills.filter(reqSkill => 
      profile.skills.some(userSkill => 
        userSkill.name.toLowerCase().includes(reqSkill.toLowerCase()) || 
        reqSkill.toLowerCase().includes(userSkill.name.toLowerCase())
      )
    );
    
    // Weight by proficiency level if possible
    let proficiencyBonus = 0;
    matchedSkills.forEach(reqSkill => {
      const userSkill = profile.skills.find(s => 
        s.name.toLowerCase().includes(reqSkill.toLowerCase()) || 
        reqSkill.toLowerCase().includes(s.name.toLowerCase())
      );
      if (userSkill) {
        if (userSkill.level === 'Expert') proficiencyBonus += 1.2;
        else if (userSkill.level === 'Advanced') proficiencyBonus += 1.0;
        else if (userSkill.level === 'Intermediate') proficiencyBonus += 0.8;
        else proficiencyBonus += 0.5;
      }
    });

    skillScore = Math.min(100, (proficiencyBonus / role.requiredSkills.length) * 100);
  } else {
    skillScore = 100; // No requirements = perfect match? Or maybe 50?
  }

  // 2. Logistics Match (30%) - Duration and Hours
  // Check duration preference
  const durationMatch = profile.availability.duration === role.type ? 100 : 50;
  
  // Check hours overlap
  const roleHours = role.preferredHours || (role.type === 'Micro' ? 20 : 40);
  const hoursDiff = Math.abs(profile.availability.hoursPerWeek - roleHours);
  const hoursScore = Math.max(0, 100 - (hoursDiff * 2));

  logisticsScore = (durationMatch + hoursScore) / 2;

  // 3. Style Match (20%) - Remote preference
  styleScore = (profile.availability.workMode === role.mode || role.mode === 'Remote') ? 100 : 60;

  // Weighted Total
  const totalScore = Math.round(
    (skillScore * 0.4) + 
    (logisticsScore * 0.3) + 
    (styleScore * 0.2) + 
    (strengthScore * 0.1)
  );

  return {
    score: totalScore,
    breakdown: {
      skills: Math.round(skillScore),
      logistics: Math.round(logisticsScore),
      style: Math.round(styleScore),
      strength: Math.round(strengthScore)
    }
  };
}
