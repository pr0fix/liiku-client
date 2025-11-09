import { useEffect, useRef, useState } from "react";
import type { Vehicle } from "../utils/types";
import { lerp, calculateProgress } from "../utils/animation";

interface AnimatedVehicle extends Vehicle {
  animatedLatitude: number;
  animatedLongitude: number;
}

const ANIMATION_DURATION: number = 10000; // 10 seconds to match backend updates

export function useVehicleAnimation(vehicles: Vehicle[]): AnimatedVehicle[] {
  const [animatedVehicles, setAnimatedVehicles] = useState<AnimatedVehicle[]>([]);
  const previousPositionsRef = useRef<Map<string, { lat: number; lng: number }>>(new Map());
  const targetPositionsRef = useRef<Map<string, { lat: number; lng: number }>>(new Map());
  const animationStartTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number>(0);
  const currentAnimatedPositionsRef = useRef<Map<string, { lat: number; lng: number }>>(new Map());
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        pausedTimeRef.current = Date.now();
      } else if (pausedTimeRef.current > 0) {
        const pauseDuration = Date.now() - pausedTimeRef.current;
        animationStartTimeRef.current += pauseDuration;
        pausedTimeRef.current = 0;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // When new vehicles arrive, update target positions and start animation
    const newTargets = new Map<string, { lat: number; lng: number }>();

    vehicles.forEach((vehicle) => {
      const newPos = { lat: vehicle.latitude, lng: vehicle.longitude };

      // Log if position actually changed
      const currentTarget = targetPositionsRef.current.get(vehicle.vehicleId);
      if (currentTarget && (currentTarget.lat !== newPos.lat || currentTarget.lng !== newPos.lng)) {
        // Use current animated position as the new starting point
        const currentAnimated = currentAnimatedPositionsRef.current.get(vehicle.vehicleId);
        if (currentAnimated) {
          previousPositionsRef.current.set(vehicle.vehicleId, currentAnimated);
        } else {
          previousPositionsRef.current.set(vehicle.vehicleId, currentTarget);
        }
      }

      newTargets.set(vehicle.vehicleId, newPos);

      if (!previousPositionsRef.current.has(vehicle.vehicleId)) {
        previousPositionsRef.current.set(vehicle.vehicleId, newPos);
      }
    });

    targetPositionsRef.current = newTargets;
    animationStartTimeRef.current = Date.now();
    pausedTimeRef.current = 0;

    const animate = () => {
      const currentTime = Date.now();
      const progress = calculateProgress(
        animationStartTimeRef.current,
        ANIMATION_DURATION,
        currentTime
      );

      const updated = vehicles.map((vehicle) => {
        const previous = previousPositionsRef.current.get(vehicle.vehicleId);
        const target = targetPositionsRef.current.get(vehicle.vehicleId);

        if (!previous || !target) {
          return {
            ...vehicle,
            animatedLatitude: vehicle.latitude,
            animatedLongitude: vehicle.longitude,
          };
        }

        const animatedLatitude = lerp(previous.lat, target.lat, progress);
        const animatedLongitude = lerp(previous.lng, target.lng, progress);

        // Store current animated position
        currentAnimatedPositionsRef.current.set(vehicle.vehicleId, {
          lat: animatedLatitude,
          lng: animatedLongitude,
        });

        return {
          ...vehicle,
          animatedLatitude,
          animatedLongitude,
        };
      });

      setAnimatedVehicles(updated);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete -> update previous positions to current targets
        vehicles.forEach((vehicle) => {
          previousPositionsRef.current.set(vehicle.vehicleId, {
            lat: vehicle.latitude,
            lng: vehicle.longitude,
          });
        });
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [vehicles]);

  return animatedVehicles;
}
