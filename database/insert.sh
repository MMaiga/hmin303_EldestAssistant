#!/bin/bash

for line in $(cat "/home/lowx/Documents/Professionnel/Etude/Master_AIGLE/M2/workspace_eclipse/HMIN302_Jeux_de_mots/ressources/nodes.txt");do
echo $line ;
IFS='|' read -ra property <<< "$line"    #Convert string to array
for prop in "${property[@]}"; do
    #echo $prop
    IFS='=' read -ra value <<< "$prop"    #Convert string to array
    for value in "${value[@]}"; do
        echo $value
    done
done
done
