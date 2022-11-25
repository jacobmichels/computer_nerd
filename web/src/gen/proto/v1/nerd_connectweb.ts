// @generated by protoc-gen-connect-web v0.3.2 with parameter "target=ts"
// @generated from file proto/v1/nerd.proto (package proto.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { SolveRequest, SolveResponse } from "./nerd_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service proto.v1.SolveService
 */
export const SolveService = {
  typeName: "proto.v1.SolveService",
  methods: {
    /**
     * @generated from rpc proto.v1.SolveService.Solve
     */
    solve: {
      name: "Solve",
      I: SolveRequest,
      O: SolveResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

