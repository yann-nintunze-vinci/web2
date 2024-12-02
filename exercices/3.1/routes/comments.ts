import { Router } from "express";
import { authorize } from "../utils/auths";

const router = Router();

router.get("/", authorize, (req, res) => {
    req.query;

    return res.json();
});

router.get("/:id", authorize, (req, res) => {
    req.params;

    return res.json();
});

router.post("/", authorize, (req, res) => {
    req.body;

    return res.json();
});

router.delete("/:id", authorize, (req, res) => {
    req.params;

    return res.json();
});

router.patch("/:id", authorize, (req, res) => {
    req.params;
    req.body;

    return res.json();
});

export default router;