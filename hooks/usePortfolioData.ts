import { useEffect, useState } from 'react';
import Parse from '../lib/parse';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  email: string;
  yearsExperience: string;
  scale: string;
  university: string;
}

export interface AcademicExperience {
  id: string;
  institution: string;
  degree: string;
  type: string;
  description: string;
  startYear: string;
  endYear: string;
  current: boolean;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  startYear: string;
  endYear: string;
  current: boolean;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
  githubUrl?: string;
}

// ─── Mock Data (fallback) ─────────────────────────────────────────────────────
const MOCK_PROFILE: Profile = {
  name: 'Marcela Dias',
  title: 'Hello, World :)',
  location: 'Recife, Brasil',
  bio: 'Estudante de Sistemas para Internet na UNICAP com experiência prática no Porto Digital. Desenvolvo interfaces com React, Next.js, TypeScript e Node.js, e trabalho com bancos de dados relacionais como PostgreSQL, MySQL e SQL Server.',
  github: 'https://github.com/marceladias',
  linkedin: 'https://linkedin.com/in/marceladias',
  email: 'marcela@example.com',
  yearsExperience: '5+',
  scale: 'Gov',
  university: 'UFPE',
};

const MOCK_ACADEMIC: AcademicExperience[] = [
  {
    id: '1',
    institution: 'Universidade Federal de Pernambuco (UFPE)',
    degree: 'Bacharelado em Ciência da Computação',
    type: 'Graduação — em andamento',
    startYear: '2021',
    endYear: 'Presente',
    description:
      'Um dos principais programas de CC do Brasil. As disciplinas abrangem algoritmos, sistemas distribuídos, bancos de dados e engenharia de software. Ativa em pesquisa e projetos aplicados.',
  },
];

const MOCK_WORK: WorkExperience[] = [
  {
    id: '1',
    title: 'Desenvolvedora Full-Stack / Líder Técnica',
    company: 'Transformação Digital Governamental',
    startYear: '2022',
    endYear: 'Presente',
    description:
      'Liderança da arquitetura e entrega de plataformas voltadas ao cidadão. Mentoria de engenheiros, design de limites de serviço e entregas em escala no setor público.',
    tags: ['Angular', 'Java', 'Spring Boot', 'Python', 'Docker', 'Keycloak', 'PostgreSQL'],
  },
  {
    id: '2',
    title: 'Desenvolvedora Full-Stack',
    company: 'Independente / Consultoria',
    startYear: '2020',
    endYear: '2022',
    description:
      'Entrega de plataformas web, sistemas de automação e pipelines de dados para clientes públicos e privados. Foco em arquitetura limpa e confiabilidade operacional.',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
  },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Portal EnvIA',
    description:
      'Portal do cidadão com SSO GovBR/Keycloak. Catálogo de serviços unificado, submissão de documentos e federação de identidade.',
    tags: ['Angular', 'Spring Boot', 'Keycloak', 'PostgreSQL'],
    featured: true,
    order: 1,
  },
  {
    id: '2',
    name: 'Sistema de Web Scraping',
    description:
      'Plataforma de raspagem e OCR resiliente combinando Selenium, OpenCV e workers em Python para extrair dados estruturados de fontes heterogêneas.',
    tags: ['Python', 'Selenium', 'OpenCV', 'Docker'],
    featured: true,
    order: 2,
  },
  {
    id: '3',
    name: 'Ferramentas de Dados Geoespaciais',
    description:
      'Pipelines de processamento para conjuntos de dados geoespaciais — ingestão, normalização e geração de tiles alimentando painéis governamentais.',
    tags: ['Python', 'PostGIS', 'GDAL'],
    featured: false,
    order: 3,
  },
  {
    id: '4',
    name: 'Microsserviços JHipster',
    description:
      'Conjunto de microsserviços estruturado com JHipster + Spring Boot, com descoberta de serviço, gateway e autenticação centralizada.',
    tags: ['Java', 'Spring Boot', 'JHipster', 'Docker'],
    featured: false,
    order: 4,
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function usePortfolioData() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [work, setWork] = useState<WorkExperience[]>([]);
  const [academic, setAcademic] = useState<AcademicExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [projectsResult, workResult, academicResult] = await Promise.all([
        fetchProjects(),
        fetchWorkExperiences(),
        fetchAcademicEducation(),
      ]);

      setProjects(projectsResult);
      setWork(workResult);
      setAcademic(academicResult);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Falha ao carregar os dados. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async (): Promise<Project[]> => {
    try {
      const query = new Parse.Query('Project');
      query.descending('createdAt'); // Mais recentes primeiro
      
      const results = await query.find();
      
      return results.map((item) => ({
        id: item.id,
        name: item.get('title') || item.get('name') || 'Sem título',
        description: item.get('description') || '',
        tags: item.get('technologies') || item.get('tags') || [],
        featured: item.get('featured') || false,
        imageUrl: item.get('imageUrl'),
        githubUrl: item.get('githubUrl'),
      }));
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return [];
    }
  };

  const fetchWorkExperiences = async (): Promise<WorkExperience[]> => {
    try {
      const query = new Parse.Query('WorkExperience');
      query.descending('startDate'); 
      
      const results = await query.find();
      
      return results.map((item) => {
        const startDate = item.get('startDate');
        const endDate = item.get('endDate');
        const current = item.get('current');
        
        return {
          id: item.id,
          title: item.get('position') || item.get('title') || 'Sem cargo',
          company: item.get('company') || '',
          description: item.get('description') || '',
          tags: item.get('technologies') || item.get('tags') || [],
          startYear: startDate ? new Date(startDate).getFullYear().toString() : '',
          endYear: current ? 'Presente' : (endDate ? new Date(endDate).getFullYear().toString() : ''),
          current: current || false,
          location: item.get('location'),
        };
      });
    } catch (error) {
      console.error('Erro ao buscar experiências:', error);
      return [];
    }
  };

  const fetchAcademicEducation = async (): Promise<AcademicExperience[]> => {
    try {
      const query = new Parse.Query('Education');
      query.descending('endDate'); 
      
      const results = await query.find();
      
      return results.map((item) => {
        const startDate = item.get('startDate');
        const endDate = item.get('endDate');
        const current = item.get('current');
        
        const degree = item.get('degree') || '';
        const course = item.get('course') || '';
        const type = degree ? `${degree} em ${course}` : course;
        
        return {
          id: item.id,
          institution: item.get('institution') || '',
          degree: degree,
          type: type,
          description: item.get('description') || '',
          startYear: startDate ? new Date(startDate).getFullYear().toString() : '',
          endYear: current ? 'Cursando' : (endDate ? new Date(endDate).getFullYear().toString() : ''),
          current: current || false,
        };
      });
    } catch (error) {
      console.error('Erro ao buscar formações:', error);
      return [];
    }
  };

  const refreshData = () => {
    fetchAllData();
  };

  return {
    projects,
    work,
    academic,
    loading,
    error,
    refreshData,
    profile: MOCK_PROFILE,
  };
}
