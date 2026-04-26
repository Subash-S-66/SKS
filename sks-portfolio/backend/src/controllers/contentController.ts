import { Request, Response } from 'express';
import { Service } from '../models/Service';
import { Project } from '../models/Project';
import { Testimonial } from '../models/Testimonial';
import { Settings } from '../models/Settings';

// Services
export const getServices = async (req: Request, res: Response) => {
  const services = await Service.find().sort({ order: 1 });
  res.json(services);
};

export const createService = async (req: Request, res: Response) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
};

export const updateService = async (req: Request, res: Response) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
};

export const deleteService = async (req: Request, res: Response) => {
  await Service.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

// Projects
export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

// Testimonials
export const getTestimonials = async (req: Request, res: Response) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
};

export const createTestimonial = async (req: Request, res: Response) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json(testimonial);
};

export const updateTestimonial = async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(testimonial);
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

// Settings
export const getSettings = async (req: Request, res: Response) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json(settings);
};

export const updateSettings = async (req: Request, res: Response) => {
  const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(settings);
};
