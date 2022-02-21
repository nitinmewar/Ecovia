import mongoose from 'mongoose';
import Bag from '../models/bagModel.js';

export const getBags = async (req, res) => {
  const bags = await Bag.find({});

  const filterBags = bags.filter((bag) => bag.ecovian === req.params.email);

  res.send(filterBags);
};

export const getSingleBag = async (req, res) => {
  const bag = await Bag.findById(req.params.id);

  res.send(bag);
};

export const createBag = async (req, res) => {
  const newBag = await Bag.create({
    size: req.body.size,
    weight: req.body.weight,
    flap_color: req.body.flap_color,
    ecovian: req.body.ecovian,
    store: req.body.store,
    condition: req.body.condition,
  });

  res.send(req.body);
};

export const deleteBag = async (req, res) => {
  const bag = await Bag.findByIdAndDelete(req.params.id);

  res.send(bag);
};

export const updateBag = async (req, res) => {
  const bag = await Bag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(bag);
};
